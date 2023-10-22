-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2023 at 12:07 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thesis_chatbot_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `archive_files`
--

CREATE TABLE `archive_files` (
  `id` int(11) NOT NULL,
  `project_title` varchar(255) NOT NULL,
  `members` text NOT NULL,
  `department` varchar(50) NOT NULL,
  `course` varchar(50) NOT NULL,
  `school_year` varchar(10) NOT NULL,
  `image_banner` varchar(255) NOT NULL,
  `abstract` text NOT NULL,
  `page_number` int(11) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Published',
  `date` varchar(50) NOT NULL,
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `archive_files`
--

INSERT INTO `archive_files` (`id`, `project_title`, `members`, `department`, `course`, `school_year`, `image_banner`, `abstract`, `page_number`, `file_path`, `status`, `date`, `isDelete`) VALUES
(1, 'dfg', 'sf', 'College of Arts and Sciences', 'BSCS', '2022-2023', 'assets/banner image/1697705640643_+_320668966_2831461903653912_5554901012643435820_n.jpg', 'In this century, tec hnology has become a part of daily lifestyle. Technology is the application of scientific knowledge to the practical goals of human life, or, as it is sometimes referred to, to the modification and manipulation of the human environment. The connection between humans and technology is the o ne reason for economic development. Technology makes individuals\' lives better. It has evolved into a primary driving force in the advancement of society\'s needs. Humans use technology for various purposes. Technology is human knowledge; it includes tools, materials, and systems. Technology has become a hobbit to somebody in the way of communicating, buying things, learning, training programs, data security, grading systems, and so much more. Humans benefit from technology when it is used correctly, but the opposite is true when it is used maliciously. Technology will always evolve with the advancement of the human race, which influences many factors in the future. This study aims to address the problem of improving the effectiveness of plagiarism detection methods by integrating various analysis methods using machine learning. Despite significant advances in the field of plagiarism detection, including better semantic text analysis and investigation of non - textual content features, there is still a need for more thorough performance evaluations of plagiarism detection systems. Thus, the study aims to identify the research gap and propose new directions for future research to enhance the accuracy and efficiency of plagiarism detection methods. ( Foltýnek 201 9) .', 12, 'assets/archive files/1697704208265_+_sample2.pdf', 'Published', 'October 19, 2023 at 4:53 PM', 'Deleted'),
(2, 'sdfsdf', 'sdfsdfs', 'College of Arts and Sciences', 'BSCS', '2022-2023', 'assets/banner image/1697717098811_+_New Project (1).png', 'In this century, tec hnology has become a part of daily lifestyle. Technology is the application of scientific knowledge to the practical goals of human life, or, as it is sometimes referred to, to the modification and manipulation of the human environment. The connection between humans and technology is the o ne reason for economic development. Technology makes individuals\' lives better. It has evolved into a primary driving force in the advancement of society\'s needs. Humans use technology for various purposes. Technology is human knowledge; it includes tools, materials, and systems. Technology has become a hobbit to somebody in the way of communicating, buying things, learning, training programs, data security, grading systems, and so much more. Humans benefit from technology when it is used correctly, but the opposite is true when it is used maliciously. Technology will always evolve with the advancement of the human race, which influences many factors in the future. This study aims to address the problem of improving the effectiveness of plagiarism detection methods by integrating various analysis methods using machine learning. Despite significant advances in the field of plagiarism detection, including better semantic text analysis and investigation of non - textual content features, there is still a need for more thorough performance evaluations of plagiarism detection systems. Thus, the study aims to identify the research gap and propose new directions for future research to enhance the accuracy and efficiency of plagiarism detection methods. ( Foltýnek 201 9) .', 12, 'assets/archive files/1697717093887_+_sample2.pdf', 'Published', 'October 19, 2023 at 8:04 PM', 'Deleted'),
(3, 'sdfsdf', 'sdfsd', 'second department', 'sdfdsf', '2022-2023', 'assets/banner image/1697717533996_+_logo.png', 'In today\'s fast - changing academic digital environment, archiving systems are essential, particularly given the exponential rise in specialized knowledge in domains like thesis and capstone projects. These initiatives preserve arduous investigations and ground - breaking ideas as the foundational archives for original research. They serve as comprehensive, cross - disciplinary knowledge stores. These perfectly organized archives serve as a tribute to the commitment and rigo rous thought that went into their construction, and they stand as a symbol of a collective effort to expand knowledge and foster novel ideas and innovations. Final year student theses are stored in a specific room, organized on book racks without clear cat egories, authors, courses, or titles. Softcopies are burned into Compact Discs and also stored there. This manual system makes it challenging for junior students to locate desired theses, with potential for human error leading to disorder. Insufficient inf ormation on covers and compact disks further complicates retrieval. Compact disks are also susceptible to damage or theft. Ensuring thesis integrity is crucial for future reference. Time constraints further hinder access. Students lack continuous availabil ity to visit the thesis room (Ismail, 2013). As stated by Sengupta (2014), i n spite of being a main source of scholarly communication, the print theses and dissertations is mostly not accessible to outside world. In this way, the important information rema ins unused and unknown to users.', 1, 'assets/archive files/1697717531337_+_1.pdf', 'Published', 'October 19, 2023 at 8:11 PM', 'Deleted'),
(4, 'Online Resume Generator Using Different Kinds of Templates', 'Shelo Mora Paglinawan', 'College of Computing Studies', 'Bachelo of Science in Engeneering', '2022-2023', 'assets/banner image/1697722621546_+_387477885_6612389338846757_3855484591788832556_n.png', 'In this century, tec hnology has become a part of daily lifestyle. Technology is the application of scientific knowledge to the practical goals of human life, or, as it is sometimes referred to, to the modification and manipulation of the human environment. The connection between humans and technology is the o ne reason for economic development. Technology makes individuals\' lives better. It has evolved into a primary driving force in the advancement of society\'s needs. Humans use technology for various purposes. Technology is human knowledge; it includes tools, materials, and systems. Technology has become a hobbit to somebody in the way of communicating, buying things, learning, training programs, data security, grading systems, and so much more. Humans benefit from technology when it is used correctly, but the opposite is true when it is used maliciously. Technology will always evolve with the advancement of the human race, which influences many factors in the future. This study aims to address the problem of improving the effectiveness of plagiarism detection methods by integrating various analysis methods using machine learning. Despite significant advances in the field of plagiarism detection, including better semantic text analysis and investigation of non - textual content features, there is still a need for more thorough performance evaluations of plagiarism detection systems. Thus, the study aims to identify the research gap and propose new directions for future research to enhance the accuracy and efficiency of plagiarism detection methods. ( Foltýnek 201 9) .', 12, 'assets/archive files/1697722617762_+_sample2.pdf', 'Published', 'October 19, 2023 at 9:32 PM', 'not'),
(5, 'Thesis and Capstone Archiving System integrating Knowledge Based Referencing Chatbot', 'Eloy Paglinawan, Shelo Paglinawan', 'College of Arts and Sciences', 'BSCS', '2022-2023', 'assets/banner image/1697723288266_+_Screenshot (9).png', 'In today\'s fast - changing academic digital environment, archiving systems are essential, particularly given the exponential rise in specialized knowledge in domains like thesis and capstone projects. These initiatives preserve arduous investigations and ground - breaking ideas as the foundational archives for original research. They serve as comprehensive, cross - disciplinary knowledge stores. These perfectly organized archives serve as a tribute to the commitment and rigo rous thought that went into their construction, and they stand as a symbol of a collective effort to expand knowledge and foster novel ideas and innovations. Final year student theses are stored in a specific room, organized on book racks without clear cat egories, authors, courses, or titles. Softcopies are burned into Compact Discs and also stored there. This manual system makes it challenging for junior students to locate desired theses, with potential for human error leading to disorder. Insufficient inf ormation on covers and compact disks further complicates retrieval. Compact disks are also susceptible to damage or theft. Ensuring thesis integrity is crucial for future reference. Time constraints further hinder access. Students lack continuous availabil ity to visit the thesis room (Ismail, 2013). As stated by Sengupta (2014), i n spite of being a main source of scholarly communication, the print theses and dissertations is mostly not accessible to outside world. In this way, the important information rema ins unused and unknown to users.', 1, 'assets/archive files/1697723285905_+_1.pdf', 'UnPublish', 'October 19, 2023 at 9:32 PM', 'not'),
(6, 'JRMSU Research Development And Extension Portal With Plagiarism Detector', 'Shelo M. Paglinawan, Ronel A. Sta. Ana, Ricalyn G. Magallon', 'College of Computing Studies', 'BSCS', '2022-2023', 'assets/banner image/1697724025569_+_393930314_1048323799527338_4713761329989285452_n.png', 'In this century, tec hnology has become a part of daily lifestyle. Technology is the application of scientific knowledge to the practical goals of human life, or, as it is sometimes referred to, to the modification and manipulation of the human environment. The connection between humans and technology is the o ne reason for economic development. Technology makes individuals\' lives better. It has evolved into a primary driving force in the advancement of society\'s needs. Humans use technology for various purposes. Technology is human knowledge; it includes tools, materials, and systems. Technology has become a hobbit to somebody in the way of communicating, buying things, learning, training programs, data security, grading systems, and so much more. Humans benefit from technology when it is used correctly, but the opposite is true when it is used maliciously. Technology will always evolve with the advancement of the human race, which influences many factors in the future. This study aims to address the problem of improving the effectiveness of plagiarism detection methods by integrating various analysis methods using machine learning. Despite significant advances in the field of plagiarism detection, including better semantic text analysis and investigation of non - textual content features, there is still a need for more thorough performance evaluations of plagiarism detection systems. Thus, the study aims to identify the research gap and propose new directions for future research to enhance the accuracy and efficiency of plagiarism detection methods. ( Foltýnek 201 9) .', 12, 'assets/archive files/1697724022622_+_vpred1.pdf', 'Published', 'October 19, 2023 at 9:32 PM', 'not'),
(7, 'JRMSU VPRED', 'Jhon Doe', 'College of Computing Studies', 'BSCS', '2022-2023', 'assets/banner image/1697818440559_+_387334313_869694251397898_682280078785607669_n.png', 'Technology has become an integral part of everyday life in the twenty - first century. As it is frequently referred to, technology is the alteration and manipulation of the human environment. It is the application of scientific knowledge to the practical pur poses of human life. The only factor causing economic growth is the interaction between people and technology. People\'s lives are improved by technology. It has developed into the main factor propelling society\'s requirements forward. Technology is utilize d by people in many ways. Tools, materials, and systems are all part of technology, which is human knowledge. In terms of communication, purchasing goods, education, training programs, data security, grading systems, and so much more, technology has become a threat to some people. Humans benefit from technology when it is used correctly, but the opposite is true when it is used maliciously. Technology will always evolve with the advancement of the human race, which influences many factors in the future. Real - time plagiarism detection systems provide immediate feedback to users, but their efficiency in handling large - scale data and providing accurate results requires further investigation. ( H Wan, K Liu, X Gao 2018). While machine learning algorithms are c ommonly used in plagiarism detection, there is a problem in comparing the effectiveness of different algorithms to determine the most accurate and efficient approach for detecting plagiarism. ( H El Mostafa, F Benabbou 2020).', 1, 'assets/archive files/1697818321265_+_Final-Thesis.pdf', 'Published', 'October 21, 2023 at 12:10 AM', 'not'),
(8, 'Thesis and Capstone Archiving System with Integrated Knowledge Based Referencing Chatbot', 'Research1, Researcher2', 'College of Computing Studies', 'BSCS', '2022-2023', 'assets/banner image/1697820980338_+_Screenshot (9).png', 'Technology has become an integral part of everyday life in the twenty - first century. As it is frequently referred to, technology is the alteration and manipulation of the human environment. It is the application of scientific knowledge to the practical pur poses of human life. The only factor causing economic growth is the interaction between people and technology. People\'s lives are improved by technology. It has developed into the main factor propelling society\'s requirements forward. Technology is utilize d by people in many ways. Tools, materials, and systems are all part of technology, which is human knowledge. In terms of communication, purchasing goods, education, training programs, data security, grading systems, and so much more, technology has become a threat to some people. Humans benefit from technology when it is used correctly, but the opposite is true when it is used maliciously. Technology will always evolve with the advancement of the human race, which influences many factors in the future. Real - time plagiarism detection systems provide immediate feedback to users, but their efficiency in handling large - scale data and providing accurate results requires further investigation. ( H Wan, K Liu, X Gao 2018). While machine learning algorithms are c ommonly used in plagiarism detection, there is a problem in comparing the effectiveness of different algorithms to determine the most accurate and efficient approach for detecting plagiarism. ( H El Mostafa, F Benabbou 2020).', 1, 'assets/archive files/1697820965292_+_Final-Thesis.pdf', 'Published', 'October 21, 2023 at 12:53 AM', 'not'),
(9, 'MABES Grading System', 'Shelo M. Paglinawan', 'College of Computing Studies', 'BSCS', '2022-2023', 'assets/banner image/1697823976168_+_Screenshot (10).png', 'Technology has become an integral part of everyday life in the twenty - first century. As it is frequently referred to, technology is the alteration and manipulation of the human environment. It is the application of scientific knowledge to the practical pur poses of human life. The only factor causing economic growth is the interaction between people and technology. People\'s lives are improved by technology. It has developed into the main factor propelling society\'s requirements forward. Technology is utilize d by people in many ways. Tools, materials, and systems are all part of technology, which is human knowledge. In terms of communication, purchasing goods, education, training programs, data security, grading systems, and so much more, technology has become a threat to some people. Humans benefit from technology when it is used correctly, but the opposite is true when it is used maliciously. Technology will always evolve with the advancement of the human race, which influences many factors in the future. Real - time plagiarism detection systems provide immediate feedback to users, but their efficiency in handling large - scale data and providing accurate results requires further investigation. ( H Wan, K Liu, X Gao 2018). While machine learning algorithms are c ommonly used in plagiarism detection, there is a problem in comparing the effectiveness of different algorithms to determine the most accurate and efficient approach for detecting plagiarism. ( H El Mostafa, F Benabbou 2020).', 1, 'assets/archive files/1697823971743_+_Final-Thesis.pdf', 'Published', 'October 21, 2023 at 12:53 AM', 'not');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `course` varchar(100) NOT NULL,
  `status` varchar(20) NOT NULL,
  `acronym` varchar(20) NOT NULL,
  `date` varchar(50) NOT NULL,
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `course`, `status`, `acronym`, `date`, `isDelete`) VALUES
(1, 'BSCS', 'Active', '', 'October 16, 2023 at 12:52 PM', 'not'),
(3, 'sdfdsf', 'Inactive', '', 'October 16, 2023 at 12:55 PM', 'not'),
(5, 'dsfsdfsdfdfsdf', 'Active', '', 'October 16, 2023 at 12:59 PM', 'Deleted'),
(6, 'more course', 'Active', '', 'October 16, 2023 at 12:59 PM', 'Deleted'),
(7, 'dsfsdf', 'Active', '', 'October 16, 2023 at 12:59 PM', 'Deleted'),
(8, 'dfds', 'Active', '', 'October 17, 2023 at 1:24 PM', 'Deleted'),
(9, '2021-2022', 'Active', '', 'October 18, 2023 at 10:34 PM', 'Deleted'),
(10, 'Bachelo of Science in Engeneering', 'Active', 'BSE', 'October 19, 2023 at 9:27 PM', 'not'),
(11, 'Bachelor of Science in Information Technology', 'Active', 'BSIT', 'October 19, 2023 at 10:24 PM', 'not'),
(12, 'lksdjf', 'Active', 'lksdjf', 'October 19, 2023 at 10:52 PM', 'Deleted');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `date` varchar(50) NOT NULL,
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name`, `status`, `description`, `date`, `isDelete`) VALUES
(1, 'College of Arts and Sciences', 'Active', '', '2023-10-15 19:51:25', 'not'),
(3, 'new department', 'Inactive', '', 'October 15, 2023 at 8:08 PM', 'not'),
(4, 'second department', 'Active', '', 'October 15, 2023 at 9:17 PM', 'Deleted'),
(5, 'sdfsdf', 'Inactive', '', 'October 15, 2023 at 9:17 PM', 'Deleted'),
(7, 'sdfds', 'Active', '', 'October 16, 2023 at 12:59 PM', 'Deleted'),
(8, 'sdf', 'Inactive', '', 'October 16, 2023 at 12:59 PM', 'Deleted'),
(9, 'fsdfsdfsd', 'Active', '', 'October 16, 2023 at 12:59 PM', 'Deleted'),
(10, 'College of Engeneering', 'Inactive', '', 'October 19, 2023 at 8:11 PM', 'Deleted'),
(11, 'College of Computing Studies', 'Active', 'this is the sample description', 'October 19, 2023 at 9:32 PM', 'not'),
(12, 'add', 'Active', 'add', 'October 19, 2023 at 10:52 PM', 'Deleted'),
(13, 'College of Maritime', 'Active', 'not yet', 'October 19, 2023 at 11:57 PM', 'not'),
(14, 'test', 'Active', 'sdf', 'October 21, 2023 at 4:47 PM', 'Deleted');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `notification_type` varchar(50) NOT NULL,
  `content` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `date` varchar(50) NOT NULL,
  `seen` int(11) NOT NULL DEFAULT 0,
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `notification_type`, `content`, `url`, `date`, `seen`, `isDelete`) VALUES
(65, 1, 'Request Document', 'Mr Programmer requested to view the MABES Grading System document', '', 'October 21, 2023 at 4:30 PM', 0, 'not'),
(66, 1, 'Department', 'You\'ve successfully added test', '', 'October 21, 2023 at 4:47 PM', 0, 'not'),
(67, 1, 'Request Document', 'Shelo Mora Paglinawan requested to view the document of Thesis and Capstone Archiving System with Integrated Knowledge Based Referencing Chatbot', '', 'October 21, 2023 at 5:39 PM', 0, 'not'),
(68, 1, 'Request Document', 'Shelo Mora Paglinawan requested to view the document of Online Resume Generator Using Different Kinds of Templates', '', 'October 21, 2023 at 6:00 PM', 0, 'not'),
(69, 1, 'Request Document', 'You have approved Mr Programmer to view the document on the MABES Grading System.', '', 'October 21, 2023 at 8:53 PM', 0, 'not'),
(70, 2, 'User Request', 'Your request on MABES Grading System was been approved by the admin!', '', 'October 21, 2023 at 8:53 PM', 0, 'not'),
(71, 1, 'Request Document', 'You have been set the status of Mr Programmer to Pending', '', 'October 21, 2023 at 8:53 PM', 0, 'not'),
(72, 2, 'User Request', 'Your request on MABES Grading System was been Disapproved by Admin', '', 'October 21, 2023 at 8:53 PM', 0, 'not'),
(73, 1, 'Request Document', 'You have been set the status of Shelo Mora Paglinawan to Pending', '', 'October 21, 2023 at 8:53 PM', 0, 'not'),
(74, 5, 'User Request', 'Your request on Thesis and Capstone Archiving System with Integrated Knowledge Based Referencing Chatbot was been Disapproved by Admin', '', 'October 21, 2023 at 8:53 PM', 0, 'not'),
(75, 1, 'Request Document', 'You have approved Shelo Mora Paglinawan to view the document on the Thesis and Capstone Archiving System with Integrated Knowledge Based Referencing Chatbot.', '', 'October 21, 2023 at 8:53 PM', 0, 'not'),
(76, 5, 'User Request', 'Your request on Thesis and Capstone Archiving System with Integrated Knowledge Based Referencing Chatbot was been approved by the admin!', '', 'October 21, 2023 at 8:53 PM', 0, 'not'),
(77, 1, 'Request Document', 'You have been set the status of Shelo Mora Paglinawan to Pending', '', 'October 21, 2023 at 8:53 PM', 0, 'not'),
(78, 5, 'User Request', 'Your request on Thesis and Capstone Archiving System with Integrated Knowledge Based Referencing Chatbot was been Disapproved by Admin', '', 'October 21, 2023 at 8:53 PM', 0, 'not'),
(79, 1, 'Request Document', 'You have been set the status of Shelo Mora Paglinawan to Pending', '', 'October 21, 2023 at 8:53 PM', 0, 'not'),
(80, 5, 'User Request', 'Your request on Online Resume Generator Using Different Kinds of Templates was been Disapproved by Admin', '', 'October 21, 2023 at 8:53 PM', 0, 'not'),
(81, 1, 'Request Document', 'You have approved Shelo Mora Paglinawan to view the document on the Online Resume Generator Using Different Kinds of Templates.', '', 'October 21, 2023 at 8:53 PM', 0, 'not'),
(82, 5, 'User Request', 'Your request on Online Resume Generator Using Different Kinds of Templates was been approved by the admin!', '', 'October 21, 2023 at 8:53 PM', 0, 'not'),
(83, 1, 'Request Document', 'You have approved Shelo Mora Paglinawan to view the document on the Thesis and Capstone Archiving System with Integrated Knowledge Based Referencing Chatbot.', '', 'October 21, 2023 at 9:14 PM', 0, 'not'),
(84, 5, 'User Request', 'Your request on Thesis and Capstone Archiving System with Integrated Knowledge Based Referencing Chatbot was been approved by the admin!', '', 'October 21, 2023 at 9:14 PM', 0, 'not'),
(85, 1, 'Request Document', 'You have been set the status of Shelo Mora Paglinawan to Pending', '', 'October 21, 2023 at 9:14 PM', 0, 'not'),
(86, 5, 'User Request', 'Your request on Thesis and Capstone Archiving System with Integrated Knowledge Based Referencing Chatbot was been Disapproved by Admin', '', 'October 21, 2023 at 9:14 PM', 0, 'not'),
(87, 1, 'Request Document', 'You have approved Shelo Mora Paglinawan to view the document on the Thesis and Capstone Archiving System with Integrated Knowledge Based Referencing Chatbot.', '', 'October 21, 2023 at 9:14 PM', 0, 'not'),
(88, 5, 'User Request', 'Your request on Thesis and Capstone Archiving System with Integrated Knowledge Based Referencing Chatbot was been approved by the admin!', '', 'October 21, 2023 at 9:14 PM', 0, 'not'),
(89, 1, 'Request Document', 'You have been set the status of Shelo Mora Paglinawan to Pending', '', 'October 21, 2023 at 9:18 PM', 0, 'not'),
(90, 5, 'User Request', 'Your request on Online Resume Generator Using Different Kinds of Templates was been Disapproved by Admin', '', 'October 21, 2023 at 9:18 PM', 0, 'not'),
(91, 1, 'Delete Department', 'You\'ve successfully deleted the test', '', 'October 22, 2023 at 8:48 AM', 0, 'not'),
(92, 1, 'Delete Department', 'You\'ve successfully deleted the second department', '', 'October 22, 2023 at 8:48 AM', 0, 'not'),
(93, 1, 'Delete Course', 'You\'ve successfully deleted the dsfsdfsdfdfsdf', '', 'October 22, 2023 at 8:48 AM', 0, 'not'),
(94, 1, 'Delete Course', 'You\'ve successfully deleted the more course', '', 'October 22, 2023 at 8:48 AM', 0, 'not'),
(95, 1, 'Delete Course', 'You\'ve successfully deleted the dsfsdf', '', 'October 22, 2023 at 8:48 AM', 0, 'not'),
(96, 1, 'Delete Course', 'You\'ve successfully deleted the 2021-2022', '', 'October 22, 2023 at 8:48 AM', 0, 'not'),
(97, 1, 'Delete Course', 'You\'ve successfully deleted the lksdjf', '', 'October 22, 2023 at 8:48 AM', 0, 'not'),
(98, 1, 'Request Document', 'You have approved Shelo Mora Paglinawan to view the document on the Online Resume Generator Using Different Kinds of Templates.', '', 'October 22, 2023 at 8:48 AM', 0, 'not'),
(99, 5, 'User Request', 'Your request on Online Resume Generator Using Different Kinds of Templates was been approved by the admin!', '', 'October 22, 2023 at 8:48 AM', 0, 'not'),
(100, 1, 'Request Document', 'Shelo Mora Paglinawan requested to view the document of JRMSU Research Development And Extension Portal With Plagiarism Detector', '', 'October 22, 2023 at 8:48 AM', 0, 'not'),
(101, 1, 'Request Document', 'Shelo Mora Paglinawan requested to view the document of JRMSU VPRED', '', 'October 22, 2023 at 8:48 AM', 0, 'not'),
(102, 1, 'Request Document', 'Shelo Mora Paglinawan requested to view the document of MABES Grading System', '', 'October 22, 2023 at 8:48 AM', 0, 'not'),
(103, 1, 'Request Document', 'i am the user2 requested to view the document of MABES Grading System', '', 'October 22, 2023 at 8:48 AM', 0, 'not'),
(104, 1, 'Request Document', 'i am the user2 requested to view the document of Thesis and Capstone Archiving System with Integrated Knowledge Based Referencing Chatbot', '', 'October 22, 2023 at 8:48 AM', 0, 'not'),
(105, 1, 'Request Document', 'i am the user2 requested to view the document of JRMSU VPRED', '', 'October 22, 2023 at 8:48 AM', 0, 'not'),
(106, 1, 'Request Document', 'i am the user2 requested to view the document of JRMSU Research Development And Extension Portal With Plagiarism Detector', '', 'October 22, 2023 at 8:48 AM', 0, 'not'),
(107, 1, 'Request Document', 'i am the user2 requested to view the document of Online Resume Generator Using Different Kinds of Templates', '', 'October 22, 2023 at 8:48 AM', 0, 'not'),
(108, 1, 'Request Document', 'You have approved i am the user2 to view the document on the Thesis and Capstone Archiving System with Integrated Knowledge Based Referencing Chatbot.', '', 'October 22, 2023 at 8:48 AM', 0, 'not'),
(109, 6, 'User Request', 'Your request on Thesis and Capstone Archiving System with Integrated Knowledge Based Referencing Chatbot was been approved by the admin!', '', 'October 22, 2023 at 8:48 AM', 0, 'not');

-- --------------------------------------------------------

--
-- Table structure for table `school_year`
--

CREATE TABLE `school_year` (
  `id` int(11) NOT NULL,
  `school_year` varchar(10) NOT NULL,
  `status` varchar(10) NOT NULL,
  `date` varchar(20) NOT NULL,
  `isDelete` varchar(10) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `school_year`
--

INSERT INTO `school_year` (`id`, `school_year`, `status`, `date`, `isDelete`) VALUES
(3, '2022-2023', 'Active', 'October 18, 2023 at ', 'not'),
(4, '2021-2022', 'Active', 'October 18, 2023 at ', 'not');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `system_name` varchar(255) NOT NULL,
  `system_short_name` varchar(50) NOT NULL,
  `welcome_content` text NOT NULL,
  `about_us` text NOT NULL,
  `system_logo` varchar(100) NOT NULL,
  `system_cover` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contact_number` varchar(50) NOT NULL,
  `address` varchar(255) NOT NULL,
  `date` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `system_name`, `system_short_name`, `welcome_content`, `about_us`, `system_logo`, `system_cover`, `email`, `contact_number`, `address`, `date`) VALUES
(1, 'Thesis and capstone archiving system  with integrated knowledge-based referencing chatbot', 'JRMSU', 'Welcome to the future of academic research and writing with our cutting-edge \"Thesis and Capstone Archiving System with Integrated Knowledge-Based Referencing Chatbot.\" This revolutionary platform empowers you to explore a vast repository of academic theses and capstone projects, while our intelligent chatbot stands ready to assist you in citing and referencing sources with precision. Whether you\'re a student or a researcher, this integrated system is your gateway to a seamless, efficient, and academically rigorous journey. Discover a world of knowledge at your fingertips, where innovation meets scholarly excellence.', 'Thesis and Capstone Archiving System with Integrated Knowledge-Based Referencing Chatbot,\' we are passionate about revolutionizing the academic research landscape. Our mission is to provide students and researchers with a state-of-the-art platform that simplifies the research process and ensures the highest standards of academic integrity. With a team dedicated to harnessing the power of technology for the benefit of scholars, we\'re committed to fostering innovation, efficiency, and excellence in academic pursuits. Join us in the exciting journey of academic exploration and discover a world of knowledge made accessible like never before.', 'assets/settings image/1697452879788_+_logo.png', 'assets/settings image/1697455109251_+_jose.jpg', 'tcaschatbot@gmail.com', '0912345678', 'MC4F+936, Govt. Sta. Cruz, Guading Adasa St, Dapitan City, Zamboanga del Norte', 'October 21, 2023 at 12:42 AM');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `user_type` varchar(20) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '0 = Verified 1 = Not Verified',
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `middle_name`, `last_name`, `username`, `password`, `image`, `user_type`, `status`, `date`, `isDelete`) VALUES
(1, 'Mr.', '', 'Programmer', 'admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'assets/image upload/1697964907020_+_Ede_vZbXsAc8zpM.png', 'Admin', 0, '2023-10-14 08:59:05', 'not'),
(2, 'Mr', '', 'Programmer', 'student', '703b0a3d6ad75b649a28adde7d83c6251da457549263bc7ff45ec709b0a8448b', 'assets/image upload/1697788488147_+_393930314_1048323799527338_4713761329989285452_n.png', 'Student', 0, '2023-10-15 06:46:53', 'not'),
(4, 'user1', '', 'secret', 'secret123', 'fcf730b6d95236ecd3c9fc2d92d7b6b2bb061514961aec041d6c7a7192f592e4', 'assets/image upload/given image.png', 'Student', 0, '2023-10-16 06:32:34', 'Deleted'),
(5, 'Shelo', 'Mora', 'Paglinawan', 'user123', 'e606e38b0d8c19b24cf0ee3808183162ea7cd63ff7912dbb22b5e803286b4446', 'assets/image upload/given image.png', 'Student', 0, '2023-10-20 07:55:53', 'not'),
(6, 'i am the', '', 'user2', 'user2', 'b8c871d486f147a9d99be27ab59c64c8781bb53c0472afd9804cbe00e174f648', 'assets/image upload/given image.png', 'Student', 0, '2023-10-22 02:02:44', 'not');

-- --------------------------------------------------------

--
-- Table structure for table `user_file_request`
--

CREATE TABLE `user_file_request` (
  `id` int(11) NOT NULL,
  `user_request_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Pending' COMMENT 'Pending or Approved',
  `isDelete` varchar(20) NOT NULL DEFAULT 'not',
  `date` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_file_request`
--

INSERT INTO `user_file_request` (`id`, `user_request_id`, `project_id`, `status`, `isDelete`, `date`) VALUES
(6, 2, 9, 'Pending', 'not', 'October 21, 2023 at 4:30 PM'),
(7, 5, 8, 'Approved', 'not', 'October 21, 2023 at 5:39 PM'),
(8, 5, 4, 'Approved', 'not', 'October 21, 2023 at 6:00 PM'),
(9, 5, 6, 'Pending', 'not', 'October 22, 2023 at 8:48 AM'),
(10, 5, 7, 'Pending', 'not', 'October 22, 2023 at 8:48 AM'),
(11, 5, 9, 'Pending', 'not', 'October 22, 2023 at 8:48 AM'),
(12, 6, 9, 'Pending', 'not', 'October 22, 2023 at 8:48 AM'),
(13, 6, 8, 'Approved', 'not', 'October 22, 2023 at 8:48 AM'),
(14, 6, 7, 'Pending', 'not', 'October 22, 2023 at 8:48 AM'),
(15, 6, 6, 'Pending', 'not', 'October 22, 2023 at 8:48 AM'),
(16, 6, 4, 'Pending', 'not', 'October 22, 2023 at 8:48 AM');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `archive_files`
--
ALTER TABLE `archive_files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_year`
--
ALTER TABLE `school_year`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_file_request`
--
ALTER TABLE `user_file_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `relationship_id` (`user_request_id`),
  ADD KEY `relationship_project_id` (`project_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `archive_files`
--
ALTER TABLE `archive_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `school_year`
--
ALTER TABLE `school_year`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_file_request`
--
ALTER TABLE `user_file_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_file_request`
--
ALTER TABLE `user_file_request`
  ADD CONSTRAINT `relationship_id` FOREIGN KEY (`user_request_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `relationship_project_id` FOREIGN KEY (`project_id`) REFERENCES `archive_files` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
