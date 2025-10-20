import React, {useContext, useState, useEffect} from "react";
import api from "../utils/api";
import {useTranslation} from "react-i18next";
import {UserContext} from "../contexts/UserProvider";

export default function Profile() {
  const {t} = useTranslation();
  const {user, setUser} = useContext( UserContext );

  const [ loading, setLoading ] = useState( false );
  const [ editing, setEditing ] = useState( false );
  const [ form, setForm ] = useState( {fullname: "", username: "", email: ""} );
  const [ passForm, setPassForm ] = useState( {
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  } );
  const [ message, setMessage ] = useState( null );
  const [ error, setError ] = useState( null );
  const [ activeTab, setActiveTab ] = useState( "account" );
  const [ uploadingPhoto, setUploadingPhoto ] = useState( false );

  // Initialize form with user data
  useEffect( () => {
    if ( user ) {
      setForm( {
        fullname: user.fullname || "",
        username: user.username || "",
        email: user.email || ""
      } );
    }
  }, [ user ] );

  const handleChange = ( e ) => {
    const {name, value} = e.target;
    setForm( prev => ( {...prev, [ name ]: value} ) );
    // Clear messages when user starts typing
    if ( message || error ) {
      setMessage( null );
      setError( null );
    }
  };

  const handlePassChange = ( e ) => {
    const {name, value} = e.target;
    setPassForm( prev => ( {...prev, [ name ]: value} ) );
    // Clear messages when user starts typing
    if ( message || error ) {
      setMessage( null );
      setError( null );
    }
  };

  const saveProfile = async ( e ) => {
    e.preventDefault();
    setMessage( null );
    setError( null );
    setLoading( true );

    try {
      console.log( "🔄 Sending profile update request...", form );

      const response = await api.put( "/api/profile/update", form );

      console.log( "✅ Profile update SUCCESS:", response );
      console.log( "📊 Response data:", response.data );

      // Check if response structure matches what we expect
      if ( response.data && response.data.data && response.data.data.user ) {
        setUser( prev => ( {...prev, ...response.data.data.user} ) );
        setEditing( false );
        setMessage( t( "profileSaved" ) || "Profile updated successfully" );
      } else if ( response.data && response.data.user ) {
        // Alternative response structure
        setUser( prev => ( {...prev, ...response.data.user} ) );
        setEditing( false );
        setMessage( t( "profileSaved" ) || "Profile updated successfully" );
      } else {
        // Unexpected response structure but request was successful
        console.warn( "Unexpected response structure:", response.data );
        setEditing( false );
        setMessage( t( "profileSaved" ) || "Profile updated successfully" );
      }

    } catch ( err ) {
      console.error( "❌ Profile update ERROR:", err );
      console.error( "Error details:", {
        message: err.message,
        response: err.response,
        request: err.request,
        config: err.config
      } );

      let errorMessage = t( "failedSave" ) || "Failed to save profile";

      if ( err.response ) {
        // Server responded with error status
        console.error( "Server response status:", err.response.status );
        console.error( "Server response data:", err.response.data );

        if ( err.response.data && err.response.data.message ) {
          errorMessage = err.response.data.message;
        }

        if ( err.response.status === 422 && err.response.data.errors ) {
          const validationErrors = Object.values( err.response.data.errors ).flat();
          errorMessage = validationErrors.join( ', ' );
        }
      } else if ( err.request ) {
        // Request was made but no response received
        console.error( "No response received:", err.request );
        errorMessage = "Network error. Please check your connection.";
      } else {
        // Something else happened
        console.error( "Other error:", err.message );
        errorMessage = err.message || "An unexpected error occurred";
      }

      setError( errorMessage );
    } finally {
      setLoading( false );
    }
  };

  const changePassword = async ( e ) => {
    e.preventDefault();
    setMessage( null );
    setError( null );

    // Client-side validation
    if ( passForm.newPassword !== passForm.confirmPassword ) {
      setError( t( "passwordMismatch" ) || "Passwords do not match" );
      return;
    }

    if ( passForm.newPassword.length < 8 ) {
      setError( t( "passwordTooShort" ) || "Password must be at least 8 characters" );
      return;
    }

    setLoading( true );

    try {
      await api.put( "api/profile/password", {
        current_password: passForm.currentPassword,
        password: passForm.newPassword,
        password_confirmation: passForm.confirmPassword
      } );

      setPassForm( {currentPassword: "", newPassword: "", confirmPassword: ""} );
      setMessage( t( "passwordChanged" ) || "Password changed successfully" );
    } catch ( err ) {
      const errorMessage = err?.response?.data?.message || t( "failedChangePassword" ) || "Failed to change password";
      setError( errorMessage );

      // Handle validation errors
      if ( err?.response?.data?.errors ) {
        console.error( "Validation errors:", err.response.data.errors );
      }
    } finally {
      setLoading( false );
    }
  };

  const handleLogout = async () => {
    try {
      await api.post( "api/logout" );
    } catch ( err ) {
      console.error( "Logout error:", err );
    } finally {
      localStorage.removeItem( "token" );
      window.location.href = "/login";
    }
  };

  const onFileChange = async ( e ) => {
    const file = e.target.files[ 0 ];
    if ( !file ) return;

    // Validate file type and size
    const validTypes = [ "image/jpeg", "image/png", "image/gif", "image/webp" ];
    if ( !validTypes.includes( file.type ) ) {
      setError( t( "invalidImageType" ) || "Please select a valid image (JPEG, PNG, GIF, WebP)" );
      return;
    }

    if ( file.size > 5 * 1024 * 1024 ) { // 5MB
      setError( t( "fileTooLarge" ) || "Image must be smaller than 5MB" );
      return;
    }

    setUploadingPhoto( true );
    setMessage( null );
    setError( null );

    try {
      const formData = new FormData();
      formData.append( "photo", file );

      const response = await api.post( "api/profile/photo", formData, {
        headers: {"Content-Type": "multipart/form-data"}
      } );

      setUser( prev => ( {
        ...prev,
        photo: response.data.data.photo_path,
        photo_url: response.data.data.photo_url
      } ) );
      setMessage( t( "photoUpdated" ) || "Photo updated successfully" );
    } catch ( err ) {
      const errorMessage = err?.response?.data?.message || t( "failedUpload" ) || "Failed to upload photo";
      setError( errorMessage );
    } finally {
      setUploadingPhoto( false );
      // Clear file input
      e.target.value = "";
    }
  };

  const deletePhoto = async () => {
    setMessage( null );
    setError( null );

    try {
      await api.delete( "api/profile/photo" );
      setUser( prev => ( {...prev, photo: null, photo_url: null} ) );
      setMessage( t( "photoDeleted" ) || "Photo deleted successfully" );
    } catch ( err ) {
      const errorMessage = err?.response?.data?.message || t( "failedDelete" ) || "Failed to delete photo";
      setError( errorMessage );
    }
  };

  const cancelEdit = () => {
    setForm( {
      fullname: user.fullname || "",
      username: user.username || "",
      email: user.email || ""
    } );
    setEditing( false );
    setMessage( null );
    setError( null );
  };

  // Loading state
  if ( !user ) {
    return (
      <div className="flex justify-center items-center bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="text-gray-700 dark:text-gray-200">{t( "loading" ) || "Loading..."}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 px-4 py-8 min-h-screen text-gray-800 dark:text-gray-100">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="font-bold text-gray-900 dark:text-white text-3xl">
            {t( "profile" ) || "Profile"}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {t( "manageYourAccount" ) || "Manage your account settings and preferences"}
          </p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
          {/* Cover Section */}
          <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 h-32">
            <div className="-bottom-12 left-6 absolute">
              <div className="group relative">
                {user?.photo && <img
                  src={`${ api.defaults.baseURL }/storage/${ user.photo }`}
                  alt={user.fullname}
                  className="shadow-lg border-4 border-white dark:border-gray-800 rounded-full w-24 h-24 object-cover"
                /> || user?.fullname?.charAt( 0 ) || "U"}

                {/* Photo Upload Overlay */}
                <label className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-full transition-opacity cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className="hidden"
                    disabled={uploadingPhoto}
                  />
                  {uploadingPhoto ? (
                    <div className="text-white">
                      <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    </div>
                  ) : (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </label>

                {/* Delete Photo Button */}
                {user.photo && (
                  <button
                    onClick={deletePhoto}
                    className="-top-2 -right-2 absolute bg-red-500 hover:bg-red-600 shadow-lg p-1 rounded-full text-white transition-colors"
                    title={t( "deletePhoto" ) || "Delete photo"}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Info Section */}
          <div className="px-6 pt-14 pb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white text-2xl">
                  {user.fullname || t( "noName" ) || "No Name"}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  @{user.username || t( "noUsername" ) || "no username"}
                </p>
                <span className="inline-block bg-blue-100 dark:bg-blue-800 mt-2 px-3 py-1 rounded-full font-medium text-blue-800 dark:text-blue-200 text-sm">
                  {user.role}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium text-white text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {t( "logout" ) || "Logout"}
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-gray-200 dark:border-gray-700 border-t">
            <div className="flex">
              <button
                onClick={() => setActiveTab( "account" )}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${ activeTab === "account"
                  ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
              >
                {t( "accountDetails" ) || "Account Details"}
              </button>
              <button
                onClick={() => setActiveTab( "security" )}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${ activeTab === "security"
                  ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
              >
                {t( "securitySettings" ) || "Security"}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Messages */}
            {message && (
              <div className="bg-green-50 dark:bg-green-900 mb-6 p-4 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300">
                {message}
              </div>
            )}

            {error && (
              <div className="bg-red-50 dark:bg-red-900 mb-6 p-4 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
                {error}
              </div>
            )}

            {/* Account Tab */}
            {activeTab === "account" && (
              <form onSubmit={saveProfile} className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {t( "accountDetails" ) || "Account Details"}
                  </h3>
                  <button
                    type="button"
                    onClick={editing ? cancelEdit : () => setEditing( true )}
                    disabled={loading}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-sm transition-colors"
                  >
                    {editing ? ( t( "cancel" ) || "Cancel" ) : ( t( "edit" ) || "Edit" )}
                  </button>
                </div>

                <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                      {t( "fullname" ) || "Full Name"}
                    </label>
                    <input
                      name="fullname"
                      value={form.fullname}
                      onChange={handleChange}
                      disabled={!editing || loading}
                      className="bg-white dark:bg-gray-700 disabled:opacity-50 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                      {t( "username" ) || "Username"}
                    </label>
                    <input
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      disabled={!editing || loading}
                      className="bg-white dark:bg-gray-700 disabled:opacity-50 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                      {t( "email" ) || "Email"}
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      disabled={!editing || loading}
                      className="bg-white dark:bg-gray-700 disabled:opacity-50 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                    />
                  </div>
                </div>

                {editing && (
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={cancelEdit}
                      disabled={loading}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      {t( "cancel" ) || "Cancel"}
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 px-6 py-2 rounded-lg font-medium text-white transition-colors"
                    >
                      {loading && (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      )}
                      {t( "save" ) || "Save Changes"}
                    </button>
                  </div>
                )}
              </form>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <form onSubmit={changePassword} className="space-y-6">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                  {t( "securitySettings" ) || "Security Settings"}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                      {t( "currentPassword" ) || "Current Password"}
                    </label>
                    <input
                      name="currentPassword"
                      type="password"
                      value={passForm.currentPassword}
                      onChange={handlePassChange}
                      disabled={loading}
                      className="bg-white dark:bg-gray-700 disabled:opacity-50 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                      {t( "newPassword" ) || "New Password"}
                    </label>
                    <input
                      name="newPassword"
                      type="password"
                      value={passForm.newPassword}
                      onChange={handlePassChange}
                      disabled={loading}
                      className="bg-white dark:bg-gray-700 disabled:opacity-50 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                      {t( "confirmPassword" ) || "Confirm Password"}
                    </label>
                    <input
                      name="confirmPassword"
                      type="password"
                      value={passForm.confirmPassword}
                      onChange={handlePassChange}
                      disabled={loading}
                      className="bg-white dark:bg-gray-700 disabled:opacity-50 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 px-6 py-2 rounded-lg font-medium text-white transition-colors"
                  >
                    {loading && (
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    )}
                    {t( "changePassword" ) || "Change Password"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}