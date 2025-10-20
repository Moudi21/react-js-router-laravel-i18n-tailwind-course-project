-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 20, 2025 at 04:48 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `backend_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `parentId` bigint(20) UNSIGNED DEFAULT NULL,
  `mediaPath` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `parentId`, `mediaPath`, `isActive`, `created_at`, `updated_at`) VALUES
(1, 'Technology & Software', NULL, '💻', 1, '2025-10-12 23:57:26', '2025-10-13 01:38:04'),
(2, 'Web Development', 1, '🌐', 1, '2025-10-12 23:57:45', '2025-10-13 05:50:21'),
(3, 'Mobile Apps', 1, '📱', 1, '2025-10-12 23:58:03', '2025-10-13 05:43:52'),
(4, 'Business & Management', NULL, '💼', 1, '2025-10-14 05:43:52', '2025-10-14 05:43:52'),
(5, 'IT & Software', NULL, '🖥️', 1, '2025-10-14 05:44:11', '2025-10-14 05:44:11'),
(6, 'Health & Wellness', NULL, '🩺', 1, '2025-10-14 05:44:34', '2025-10-14 05:44:34'),
(7, 'Language Learning', NULL, '🗣️', 1, '2025-10-14 05:44:49', '2025-10-14 05:44:49'),
(8, 'Design & Creative', NULL, '🎨', 1, '2025-10-14 05:45:08', '2025-10-14 05:45:08'),
(9, 'Data Science', NULL, '📊', 1, '2025-10-14 05:45:25', '2025-10-14 05:45:25'),
(10, 'Engineering', NULL, '⚙️', 1, '2025-10-14 05:45:52', '2025-10-14 05:45:52'),
(11, 'Marketing & Sales', NULL, '📣', 1, '2025-10-14 05:46:09', '2025-10-14 05:46:09'),
(12, 'Game Development', 1, '🎮', 1, '2025-10-14 05:47:28', '2025-10-14 05:47:28'),
(13, 'Leadership', 4, '🧭', 1, '2025-10-14 05:48:29', '2025-10-14 05:48:29'),
(14, 'Finance', 4, '💹', 1, '2025-10-14 05:50:22', '2025-10-14 05:50:40'),
(15, 'Entrepreneurship', 4, '🚀', 1, '2025-10-14 05:51:11', '2025-10-14 05:51:11'),
(16, 'Network Security', 5, '🔐', 1, '2025-10-14 05:51:33', '2025-10-14 05:51:33'),
(17, 'Cloud Computing', 5, '☁️', 1, '2025-10-14 05:51:55', '2025-10-14 05:51:55'),
(18, 'System Administration', 5, '🛠️', 1, '2025-10-14 05:52:11', '2025-10-14 05:52:11'),
(19, 'Nutrition', 6, '🥗', 1, '2025-10-14 05:52:46', '2025-10-14 05:52:46'),
(20, 'Fitness', 6, '🏋️', 1, '2025-10-14 05:53:09', '2025-10-14 05:53:09'),
(21, 'Mental Health', 6, '🧠', 1, '2025-10-14 05:53:24', '2025-10-14 05:53:24'),
(22, 'English', 7, '🇬🇧', 1, '2025-10-14 05:53:51', '2025-10-14 05:53:51'),
(23, 'Spanish', 7, '🇪🇸', 1, '2025-10-14 05:54:04', '2025-10-14 05:54:04'),
(24, 'French', 7, '🇫🇷', 1, '2025-10-14 05:54:21', '2025-10-14 05:54:21'),
(25, 'Graphic Design', 8, '🖌️', 1, '2025-10-14 05:54:41', '2025-10-14 05:54:41'),
(26, 'UI/UX', 8, '🧩', 1, '2025-10-14 05:55:11', '2025-10-14 05:55:11'),
(27, '3D Modeling', 8, '🧊', 1, '2025-10-14 05:55:25', '2025-10-14 05:55:25'),
(28, 'Photography', 8, '📷', 1, '2025-10-14 05:55:37', '2025-10-14 05:55:37'),
(29, 'Data Analysis', 9, '🧮', 1, '2025-10-14 05:56:21', '2025-10-14 05:56:21'),
(30, 'Machine Learning', 9, '🤖', 1, '2025-10-14 05:56:43', '2025-10-14 05:56:43'),
(31, 'Deep Learning', 9, '🧠', 1, '2025-10-14 05:56:55', '2025-10-14 05:56:55');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `provider` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `users` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `categoryName` varchar(255) NOT NULL,
  `disc` text DEFAULT NULL,
  `rating` tinyint(3) UNSIGNED NOT NULL,
  `platform` varchar(255) NOT NULL,
  `price` decimal(8,2) NOT NULL DEFAULT 0.00,
  `isActive` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `provider`, `date`, `users`, `image`, `link`, `categoryName`, `disc`, `rating`, `platform`, `price`, `isActive`, `created_at`, `updated_at`) VALUES
(1, 'The Complete Full-Stack Web Development Bootcamp Javascrip, React.js,Tailwindcs,Node.js.s', 'Udemy', '2025-10-07', 1, 'https://blog.hrflow.ai/content/images/2020/04/Full-Stack-Developer.jpg', 'https://www.udemy.com/course/the-complete-web-development-bootcamp/', 'Web Development', 'This comprehensive course will take you through the essential skills needed to become a successful full-stack developer. You’ll learn frontend and backend technologies, build interactive web applications, and gain hands-on experience with modern frameworks and tools.', 5, 'Udemy', 0.00, 1, '2025-10-13 08:29:00', '2025-10-16 07:15:59'),
(2, 'Meta Front-End Developer Certificate', 'Coursera', '2025-10-10', 1, 'https://images.unsplash.com/photo-1669023414166-a4cc7c0fe1f5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032', NULL, 'Web Development', 'This comprehensive course will take you through the essential skills needed to become a successful full-stack developer. You’ll learn frontend and backend technologies, build interactive web applications, and gain hands-on experience with modern frameworks and tools.', 4, 'Coursera', 1.00, 1, '2025-10-13 08:55:30', '2025-10-18 10:22:04'),
(3, 'React Native Specialization', 'IBM via Coursera', '2025-11-30', 2400, 'https://media.istockphoto.com/id/2205011869/photo/quantum-computing-processing-a-huge-amount-of-data-in-a-short-period-of-time.webp?s=1024x1024&w=is&k=20&c=_cW2Eq7sMtyfqWoxd0Avi4tToE8Fw1Xr_mPZD2yhdQs=', 'https://www.coursera.org/learn/introduction-to-web-development', 'Mobile Apps', 'This comprehensive course will take you through the essential skills needed to become a successful full-stack developer. You’ll learn frontend and backend technologies, build interactive web applications, and gain hands-on experience with modern frameworks and tools.', 3, 'zoom', 30.00, 1, '2025-10-14 03:11:04', '2025-10-18 10:21:24'),
(4, 'Strategic Leadership and Management', 'Coursera', '2025-10-31', 28000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf9QYoSkg-erBok4mzIcCSTY6PZjhm-0Vb_A&s', 'https://www.coursera.org/specializations/strategic-leadership', 'Leadership', NULL, 0, 'Coursera', 0.00, 1, '2025-10-17 11:57:22', '2025-10-17 12:01:03'),
(5, 'Inspiring and Motivating Individuals', 'Coursera', '2025-11-08', 35000, 'https://cloudinary.hbs.edu/hbsit/image/upload/s--IxGOEXSf--/f_auto,c_fill,h_375,w_750,/v20200101/A9C8723D24F2594BE60F473E3B123BA3.jpg', 'https://www.coursera.org/learn/leading-teams', 'Leadership', NULL, 0, 'Coursera', 0.00, 1, '2025-10-17 11:58:16', '2025-10-17 12:01:28'),
(6, 'Leadership Communication for Maximum Impact', 'Coursera', '2025-10-22', 32000, 'https://plus.unsplash.com/premium_photo-1661497336283-c4176da1078e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', NULL, 'Leadership', 'Transform your leadership effectiveness through powerful communication strategies that inspire teams, drive change, and achieve exceptional results. This comprehensive course equips current and aspiring leaders with the communication toolkit needed to excel in today\'s dynamic business environment.', 5, 'Coursera', 35.00, 1, '2025-10-17 11:59:24', '2025-10-18 10:20:23'),
(7, 'Strategic Leadership and Management', 'IBM via Coursera', '2025-11-13', 28450, 'https://plus.unsplash.com/premium_photo-1661501002006-ca73a2ea990c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=890', NULL, 'Finance', NULL, 4, 'zoom', 79.00, 1, '2025-10-17 12:05:44', '2025-10-18 10:18:25'),
(8, 'Inspiring and Motivating Individuals', 'IBM via Coursera', '2025-11-21', 35200, 'https://images.unsplash.com/photo-1551784355-02b54e316ef6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', NULL, 'Finance', NULL, 4, 'zoom', 49.00, 1, '2025-10-17 12:07:10', '2025-10-18 10:19:02'),
(9, 'Entrepreneurship: From Idea to Launch', 'Udemy', '2025-08-15', 41800, 'https://images.unsplash.com/photo-1595450547833-95af46d7c43a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=871', NULL, 'Entrepreneurship', NULL, 5, 'Udemy', 89.00, 1, '2025-10-17 12:09:31', '2025-10-18 10:25:54'),
(10, 'Network Security Fundamental', 'Cisco Networking Academy', '2025-11-29', 1250, 'https://plus.unsplash.com/premium_photo-1685697927817-8e8e0ab6ec9e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032', NULL, 'Network Security', 'Learn the basics of network security, including threats, vulnerabilities, and defense mechanisms. This course covers firewall configuration, intrusion detection, and security protocols.', 0, 'Cisco', 89.99, 1, '2025-10-19 09:32:36', '2025-10-19 10:09:37'),
(11, 'Advanced Cybersecurity & Ethical Hacking', 'EC-Council', '2025-12-18', 890, 'https://images.unsplash.com/photo-1719255417989-b6858e87359e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', NULL, 'Network Security', 'Master ethical hacking techniques and advanced cybersecurity concepts. Learn penetration testing, vulnerability assessment, and security auditing for enterprise networks.', 5, 'EC-Council', 149.99, 1, '2025-10-19 09:33:48', '2025-10-19 10:10:11'),
(12, 'Firewall Administration & Management', 'Fortinet', '2024-12-01', 670, 'https://plus.unsplash.com/premium_photo-1661645616141-1a85c57e35ee?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=904', 'https://example.com/firewall-administration', 'Network Security', 'Comprehensive guide to firewall configuration and management.', 4, 'Fortinet', 0.00, 1, '2025-10-19 12:35:41', '2025-10-19 10:11:08'),
(13, 'AWS Cloud Practitioner Certification', 'Amazon Web Services', '2024-09-25', 2750, 'https://plus.unsplash.com/premium_photo-1683288706548-e8b6bb72fe86?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774', '/courses/aws-cloud-practitioner', 'Cloud Computing', 'Fundamental AWS cloud concepts for beginners. Learn cloud economics, basic infrastructure, security, and architecture. Perfect starting point for AWS certification path.', 4, 'AWS', 89.99, 1, '2025-10-19 13:22:00', '2025-10-19 10:23:50'),
(14, 'Azure Administrator Associate', 'Microsoft', '2024-11-08', 1560, 'https://plus.unsplash.com/premium_photo-1681074963522-00ca908dce4e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', '/courses/azure-administrator', 'Cloud Computing', 'Comprehensive training for Azure administrators. Learn to manage Azure subscriptions, secure identities, implement storage solutions, configure virtual networking, and monitor services.', 5, 'Azure', 179.99, 1, '2025-10-19 13:22:00', '2025-10-19 10:24:38'),
(15, 'Multi-Cloud Deployment Strategies', 'Cloud Academy', '2024-12-15', 890, 'https://media.istockphoto.com/id/1452233669/photo/cloud-storage-data-center-digital-service-or-application-with-data-transfer-network-computing.jpg?s=1024x1024&w=is&k=20&c=i7yfitHF4OG0lD_I1D3bgcA4eYAWbOcT-PWadchaJb0=', '/courses/multi-cloud-deployment', 'Cloud Computing', 'Advanced course covering multi-cloud architecture and deployment. Learn to design systems that span AWS, Azure, and GCP for maximum flexibility and redundancy.', 4, 'Multi-Cloud', 249.99, 1, '2025-10-19 13:22:00', '2025-10-19 10:25:19'),
(16, 'Linux System Administration', 'Red Hat', '2024-11-10', 2150, 'https://media.istockphoto.com/id/833634014/vector/terminal-isometric-icon-isolated-on-color-background.jpg?s=612x612&w=is&k=20&c=5_QayhkA7dCndJvmjl1zySeIu24DmxqG9akojMp_GpQ=', 'https://example.com/linux-admin', 'System Administration', 'Comprehensive Linux system administration course covering user management, file systems, networking, security, and server configuration. Hands-on labs with CentOS and Ubuntu.', 5, 'Linux', 129.99, 1, '2025-10-19 13:28:00', '2025-10-19 10:29:05'),
(17, 'Windows Server Management', 'Microsoft', '2024-10-25', 1780, 'https://media.istockphoto.com/id/1386531981/photo/file-manager-used-to-browse-folders-on-computer-exploring-directories-on-hard-drive-document.jpg?s=1024x1024&w=is&k=20&c=zAutfLSxskR_JxQG19NC_FEf6Xghj4CVCsOeD4W_5JA=', 'https://example.com/windows-server', 'System Administration', 'Master Windows Server administration including Active Directory, DNS, DHCP, Group Policy, and PowerShell automation. Perfect for enterprise environment management.', 4, 'Windows Server', 159.99, 1, '2025-10-19 13:28:00', '2025-10-19 10:29:50'),
(18, 'Network and Server Monitoring', 'Nagios', '2024-12-01', 1250, 'https://media.istockphoto.com/id/1091436276/photo/close-up-programmer-man-hand-typing-on-keyboard-laptop-for-register-data-system-or-access.jpg?s=1024x1024&w=is&k=20&c=pCQR0mj674YDtPMqOJqgBsV5hmAvQ0FZLKt29E71nW4=', 'https://example.com/server-monitoring', 'System Administration', 'Learn to monitor servers and network infrastructure using Nagios, Zabbix, and Prometheus. Set up alerts, dashboards, and performance tracking for system health.', 4, 'Monitoring Tools', 0.00, 1, '2025-10-19 13:28:00', '2025-10-19 10:30:23'),
(19, 'Sports Nutrition Fundamentals', 'International Sports Sciences Association', '2024-11-15', 1850, 'https://media.istockphoto.com/id/1468302546/vector/3d-isometric-flat-vector-conceptual-illustration-of-sports-nutrition.jpg?s=1024x1024&w=is&k=20&c=-gsPQu6NWOWd30PPIjbr7KRKYYbHToSSWH58hkX9a0c=', 'https://example.com/sports-nutrition', 'Nutrition', 'Learn the science behind sports nutrition, including macronutrient timing, hydration strategies, and supplement use for optimal athletic performance and recovery.', 5, 'ISSA', 149.99, 1, '2025-10-19 13:31:52', '2025-10-19 10:32:35'),
(20, 'Clinical Nutrition and Dietetics', 'Academy of Nutrition and Dietetics', '2024-10-20', 1420, 'https://media.istockphoto.com/id/499030939/photo/diet-and-healthy-food.jpg?s=1024x1024&w=is&k=20&c=3RYXpHTFv96j2ore8Jv5qnklzoVjgt6ayudJM80Ug2o=', 'https://example.com/clinical-nutrition', 'Nutrition', 'Comprehensive course covering medical nutrition therapy, dietary assessment, and nutritional interventions for various health conditions and disease states.', 4, 'AND', 199.99, 1, '2025-10-19 13:31:52', '2025-10-19 10:33:12'),
(21, 'Plant-Based Nutrition Certification', 'eCornell', '2024-12-05', 2360, 'https://media.istockphoto.com/id/2000149545/vector/collection-of-vector-labels-for-product-package-cruelty-free-gmo-free-no-hormones-bio-eco.jpg?s=1024x1024&w=is&k=20&c=MgP0iaO1PnzBvTCG7gHWCzma7D-oLXVWUQrBBKsuIFo=', 'https://example.com/plant-based-nutrition', 'Nutrition', 'Evidence-based plant-based nutrition course covering health benefits, meal planning, and practical implementation for individuals and families.', 4, 'Cornell University', 0.00, 1, '2025-10-19 13:31:52', '2025-10-19 10:33:42'),
(22, 'Cognitive Behavioral Therapy Fundamentals', 'Beck Institute', '2024-11-12', 1950, 'https://media.istockphoto.com/id/2228768353/photo/a-head-with-the-words-cognitive-behavioral-therapy-written-around-it.jpg?s=1024x1024&w=is&k=20&c=WOzqom3AbX0SeDvTt9MiagUJudnk7HMZ_IaKzEfIHzc=', 'https://example.com/cbt-fundamentals', 'Mental Health', 'Learn the core principles of Cognitive Behavioral Therapy, including identifying cognitive distortions, behavioral activation, and evidence-based techniques for anxiety and depression.', 5, 'Beck Institute', 179.99, 1, '2025-10-19 13:34:57', '2025-10-19 10:35:54'),
(23, 'Mindfulness-Based Stress Reduction', 'UMass Medical School', '2024-10-18', 2280, 'https://media.istockphoto.com/id/2129314820/vector/mindfulness-solid-icon-set.jpg?s=1024x1024&w=is&k=20&c=SiuUR2GBPCSPYY9ic2HdyoCOu-qVjhIt7xyNlo8-ufc=', 'https://example.com/mindfulness-mbsr', 'Mental Health', 'Comprehensive MBSR program teaching mindfulness meditation, body awareness, and yoga to reduce stress, manage pain, and improve overall mental wellbeing.', 4, 'UMass Center for Mindfulness', 129.99, 1, '2025-10-19 13:34:57', '2025-10-19 10:36:48'),
(24, 'Mental Health First Aid Certification', 'National Council for Mental Wellbeing', '2024-12-08', 3150, 'https://plus.unsplash.com/premium_photo-1702599180253-58ebeafeff68?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', 'https://example.com/mhfa-certification', 'Mental Health', 'Learn to identify, understand, and respond to signs of mental health and substance use challenges. Earn official Mental Health First Aid certification.', 4, 'MHFA', 0.00, 1, '2025-10-19 13:34:57', '2025-10-19 10:37:57'),
(25, 'Business English Communication', 'British Council', '2024-11-14', 1850, 'https://plus.unsplash.com/premium_photo-1661382100492-91afa67e11c6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=872', 'https://example.com/business-english', 'English', 'Master professional English communication skills for business meetings, presentations, emails, and negotiations in international corporate environments.', 4, 'British Council', 89.99, 1, '2025-10-19 13:41:07', '2025-10-19 10:42:03'),
(26, 'IELTS Preparation Course', 'Cambridge English', '2024-10-22', 2750, 'https://media.istockphoto.com/id/2215702435/photo/wooden-table-with-a-cup-of-pencils-and-a-stack-of-books.jpg?s=1024x1024&w=is&k=20&c=mHFORHnbKALAD2xcevUw-bo-lDJj1lXy9lc8gx7yt0M=', 'https://example.com/ielts-preparation', 'English', 'Comprehensive IELTS exam preparation covering all four skills: listening, reading, writing, and speaking. Practice tests and expert feedback included.', 5, 'Cambridge', 119.99, 1, '2025-10-19 13:41:07', '2025-10-19 10:42:58'),
(27, 'Spanish for Beginners A1-A2', 'Instituto Cervantes', '2024-11-05', 1920, 'https://media.istockphoto.com/id/690470886/photo/concept-of-learning-spanish-language.jpg?s=1024x1024&w=is&k=20&c=vlIb2AJ3NoT2IzV9a0qDqkht3wAHSYmG4s8tizZXKo0=', 'https://example.com/spanish-beginners', 'Spanish', 'Learn basic Spanish vocabulary, grammar, and conversation skills for everyday situations. Perfect for absolute beginners starting their Spanish journey.', 4, 'Instituto Cervantes', 79.99, 1, '2025-10-19 13:41:07', '2025-10-19 10:43:51'),
(28, 'Medical Spanish for Healthcare', 'Medical Spanish Institute', '2024-12-12', 1350, 'https://media.istockphoto.com/id/1987096880/photo/womens-health-appointment.jpg?s=1024x1024&w=is&k=20&c=Zrix9zxImDbsmD_uv27LmYpbAwhJEysba79_0glD45k=', 'https://example.com/medical-spanish', 'Spanish', 'Specialized Spanish course for healthcare professionals. Learn medical terminology, patient communication, and cultural competency for Spanish-speaking patients.', 5, 'MSI', 149.99, 1, '2025-10-19 13:41:07', '2025-10-19 10:44:26'),
(29, 'French Conversation Mastery', 'Alliance Française', '2024-10-30', 1680, 'https://media.istockphoto.com/id/174944914/photo/proofreading.jpg?s=1024x1024&w=is&k=20&c=KmI4EcEKlEgOiPrQ9tgMXwf3ocsFOvz7-Jwq5l7crFE=', 'https://example.com/french-conversation', 'French', 'Improve your French speaking and listening skills through immersive conversation practice, role-plays, and real-life scenarios with native speakers.', 4, 'Alliance Française', 99.99, 1, '2025-10-19 13:41:07', '2025-10-19 10:46:06'),
(30, 'DELF B1 Exam Preparation', 'France Education International', '2024-12-03', 1420, 'https://media.istockphoto.com/id/1183156252/photo/handsome-man-holding-pen-while-filling-tax-documents.jpg?s=1024x1024&w=is&k=20&c=vsPtlhEit2l6tWNlQabIRQkSR8F78VVLjJvFlhpLpLM=', 'https://example.com/delf-preparation', 'French', 'Complete preparation for the DELF B1 French proficiency exam. Practice all test sections and develop strategies for success in the official certification.', 4, 'FEI', 0.00, 1, '2025-10-19 13:41:07', '2025-10-19 10:46:36'),
(31, 'Adobe Creative Suite Masterclass', 'Adobe Certified Experts', '2024-11-18', 2250, 'https://images.unsplash.com/photo-1663334840232-03a3c8631089?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=888', 'https://example.com/adobe-masterclass', 'Graphic Design', 'Comprehensive training in Photoshop, Illustrator, and InDesign. Learn professional design techniques for print, web, and digital media projects.', 5, 'Adobe', 199.99, 1, '2025-10-19 13:48:34', '2025-10-19 10:50:37'),
(32, 'Brand Identity and Logo Design', 'Shillington School', '2024-10-28', 1680, 'https://plus.unsplash.com/premium_photo-1663050998917-a09084e8cfb5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', 'https://example.com/brand-identity', 'Graphic Design', 'Master the art of creating memorable brand identities. Learn logo design, color theory, typography, and brand guideline development for businesses.', 4, 'Shillington', 149.99, 1, '2025-10-19 13:48:34', '2025-10-19 10:51:08'),
(33, 'User Experience Design Fundamentals', 'Nielsen Norman Group', '2024-11-25', 1950, 'https://plus.unsplash.com/premium_photo-1733306548826-95daff988ae6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=912', 'https://example.com/ux-fundamentals', 'UI/UX', 'Learn UX research methods, user testing, wireframing, and prototyping. Create user-centered designs that solve real problems and improve user satisfaction.', 5, 'NN/g', 179.99, 1, '2025-10-19 13:48:34', '2025-10-19 10:51:49'),
(34, 'Figma for UI Design and Prototyping', 'Figma Academy', '2024-12-07', 2450, 'https://images.unsplash.com/photo-1710799885122-428e63eff691?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987', 'https://example.com/figma-ui', 'UI/UX', 'Master Figma for modern UI design. Learn component libraries, auto-layout, prototyping, and collaborative design workflows for digital products.', 4, 'Figma', 0.00, 1, '2025-10-19 13:48:34', '2025-10-19 10:52:16'),
(35, 'Blender 3D Modeling and Animation', 'Blender Foundation', '2024-11-08', 1820, 'https://plus.unsplash.com/premium_photo-1715593513707-7ce6391eaa7e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', 'https://example.com/blender-3d', '3D Modeling', 'Complete Blender course covering 3D modeling, texturing, lighting, and animation. Create professional 3D assets and animations from scratch.', 4, 'Blender', 129.99, 1, '2025-10-19 13:48:34', '2025-10-19 10:52:44'),
(36, 'Maya for Character Modeling', 'Autodesk', '2024-12-15', 1350, 'https://plus.unsplash.com/premium_photo-1740011638722-97651193fc67?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774', 'https://example.com/maya-character', '3D Modeling', 'Professional character modeling course using Autodesk Maya. Learn sculpting, retopology, UV mapping, and character rigging for games and animation.', 5, 'Autodesk', 249.99, 1, '2025-10-19 13:48:34', '2025-10-19 10:53:46');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '2025_10_10_104016_create_personal_access_tokens_table', 1),
(4, '2025_10_10_183406_create_categories_table', 1),
(5, '2025_10_13_081911_create_page_data_table', 1),
(8, '2025_10_13_120525_create_courses_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `page_data`
--

CREATE TABLE `page_data` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `disc` text DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `mediaPath` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `page_data`
--

INSERT INTO `page_data` (`id`, `name`, `link`, `disc`, `type`, `mediaPath`, `isActive`, `created_at`, `updated_at`) VALUES
(2, 'home', '/', NULL, 'links', NULL, 1, '2025-10-13 02:39:20', '2025-10-13 02:59:26'),
(3, 'about', '/about', NULL, 'links', NULL, 1, '2025-10-13 02:39:53', '2025-10-13 02:39:53'),
(4, 'Udemy', 'https://www.udemy.com/', NULL, 'brands', 'https://img.icons8.com/color/96/000000/udemy.png', 1, '2025-10-13 02:44:16', '2025-10-13 02:44:16'),
(5, 'Coursera', 'https://www.coursera.org/', NULL, 'brands', 'https://img.icons8.com/?size=100&id=brPKCGmHqb0l&format=png&color=000000', 1, '2025-10-13 02:45:17', '2025-10-13 02:47:19'),
(6, 'IBM via Coursera', 'https://www.coursera.org/ibm', NULL, 'brands', 'https://img.icons8.com/color/96/000000/ibm.png', 1, '2025-10-13 02:48:25', '2025-10-13 02:48:25'),
(7, 'WsCube Tech', 'https://www.wscubetech.com/', NULL, 'brands', '/icons/logo-cub.png', 1, '2025-10-13 02:49:19', '2025-10-13 02:49:19'),
(8, 'Simplilearn', 'https://www.simplilearn.com/', NULL, 'brands', '/icons/Simplilearn-logo.webp', 1, '2025-10-13 02:49:55', '2025-10-13 02:49:55'),
(9, 'contact', '/contact', NULL, 'links', NULL, 0, '2025-10-13 12:07:21', '2025-10-13 12:07:21');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(23, 'App\\Models\\User', 1, 'login-token', '31e3b513a335362ea71e6d61f21a904390d8c0aa2807cd73a20244033f3d0a6f', '[\"*\"]', '2025-10-20 11:29:26', NULL, '2025-10-20 11:29:26', '2025-10-20 11:29:26'),
(24, 'App\\Models\\User', 2, 'login-token', 'c24f9c29891cc310715975644e10ef2f0f8edee023e6910add6ff6cd5f091185', '[\"*\"]', '2025-10-20 11:29:47', NULL, '2025-10-20 11:29:46', '2025-10-20 11:29:47');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `userId` bigint(20) UNSIGNED DEFAULT NULL,
  `ipAddress` varchar(45) DEFAULT NULL,
  `userAgent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `lastActivity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `emailVerifiedAt` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `username`, `email`, `photo`, `emailVerifiedAt`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'muhammad', 'admin', 'admin@example.com', 'photos/l9mEmb9TxDyJ7joojJAaxYumdrfhNuGvpsLx0FCY.jpg', NULL, '$2y$12$kmHuiNipU2MNIJgRL2eHN./j.iTpcU/fu6l5jTN91GYSf1WCyOomG', 'admin', NULL, '2025-10-12 23:55:02', '2025-10-18 16:54:45'),
(2, 'user', 'user', 'user@example.com', '', NULL, '$2y$12$P8TZ2xGkY/iK.7XSAC70YO22Ub5Fu.coXhMjjO3qXW2uV4CnE4F0.', 'user', NULL, '2025-10-14 02:36:16', '2025-10-14 02:36:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categories_parentid_foreign` (`parentId`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `page_data`
--
ALTER TABLE `page_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_userid_index` (`userId`),
  ADD KEY `sessions_lastactivity_index` (`lastActivity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_username_unique` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `page_data`
--
ALTER TABLE `page_data`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_parentid_foreign` FOREIGN KEY (`parentId`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
