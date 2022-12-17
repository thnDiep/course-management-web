-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2022 at 05:26 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `academy`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(250) NOT NULL,
  `parentID` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `parentID`) VALUES
(1, 'IT', NULL),
(2, 'Web development', 1),
(3, 'Mobile Development', 1),
(4, 'Game Development', 1),
(5, 'Design', NULL),
(6, 'Web Design', 5),
(7, 'Game Design', 5),
(8, '3D & Animation', 5),
(9, 'Fashion Design', 5),
(10, 'Marketing', NULL),
(11, 'Digital Marketing', 10),
(12, 'Content Marketing', 10),
(13, 'Branding', 10),
(14, 'Music', NULL),
(15, 'Vocal', 14),
(16, 'Music Production', 14),
(17, 'nodejs', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `chapter`
--

CREATE TABLE `chapter` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(250) COLLATE utf8_bin NOT NULL,
  `courseID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `chapter`
--

INSERT INTO `chapter` (`id`, `name`, `courseID`) VALUES
(1, 'Hello Javascript', 1),
(2, 'Storing information in variables', 1),
(3, 'Conditional statement', 1);

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `name` varchar(250) NOT NULL,
  `tinyDescription` text DEFAULT NULL,
  `fullDescription` text NOT NULL,
  `fee` int(10) UNSIGNED NOT NULL,
  `updateTime` datetime NOT NULL,
  `image` varchar(100) NOT NULL,
  `video` varchar(100) DEFAULT NULL,
  `rated` decimal(5,1) DEFAULT NULL,
  `idCategory` int(10) UNSIGNED NOT NULL,
  `required` text NOT NULL,
  `benefit` text NOT NULL,
  `status` tinyint(4) NOT NULL,
  `views` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `name`, `tinyDescription`, `fullDescription`, `fee`, `updateTime`, `image`, `video`, `rated`, `idCategory`, `required`, `benefit`, `status`, `views`) VALUES
(0000000001, 'Javascript for Beginners', 'Learn javascript online and supercharge your web design with this Javascript for beginners training course.', 'Take this Javascript training course and start learning Javascript today.\r\n\r\n\"As a business guy I have no place in programming.\" Ten years ago you could have gotten away with that statement. Today you say that to your colleagues and they scoff at you before they go back to their computers to fix real problems and do real work.\r\n\r\nIf you want to do something useful start by learning Javascript . In these days when the browser is central to all computer use knowing \"the language of the browser\" is the most important step. A few years ago Javascript potential was uncertain and many programmers considered it useless. These days however competent programmers have identified Javascript real potential and uses and it has gone from a toy language to the main language of the browser. It has become one of the most useful languages of this era. Every developer needs at least a basic understanding of Javascript. A developer who knows Javascript is the rockstar of the company and is in constant demand by employers. Our online Javascript\r\n\r\ncourse will get you started by teaching all the essential aspects of coding in Javascript. So... what\'s it gonna be? Do you want to supercharge your career and be in constant demand by employers? Do you want to learn how to create dynamic and innovative Javascript documents? Start programming today with our Javascript course for Beginners training and take control of your career.', 299000, '2022-12-13 16:38:53', 'https://i.ytimg.com/vi/vDQ9GZsJkms/maxresdefault.jpg', 'https://www.youtube.com/embed/zBPeGR48_vE', '4.0', 1, 'Some basic knowledge of HTML is required for this course.', '<table class=\"table\">\r\n     <thead>\r\n            <tr>\r\n              <th colspan=\"2\">What will you learn</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr>\r\n              <td>\r\n                <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\r\n                Extensive, informative and interesting video lecture\r\n              </td>\r\n              <td>\r\n                <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\r\n                Complete Code demonstrated in lecture\r\n              </td>\r\n            </tr>\r\n            <tr>\r\n              <td>\r\n                <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\r\n                Lab Exercises\r\n              </td>\r\n              <td>\r\n                <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\r\n                Lab Solution Sets\r\n              </td>\r\n            </tr>\r\n            <tr>\r\n              <td>\r\n                <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\r\n                All Powerpoint Demonstrations Used in Course\r\n              </td>\r\n              <td>\r\n                <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\r\n                Instructor contact Email for questions and clarifications\r\n              </td>\r\n            </tr>\r\n            <tr>\r\n              <td>\r\n                <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\r\n                Coverage of all important primary Javascript concepts\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table> ', 1, 12);

-- --------------------------------------------------------

--
-- Table structure for table `course_of_student`
--

CREATE TABLE `course_of_student` (
  `studentID` int(10) UNSIGNED NOT NULL,
  `courseID` int(10) UNSIGNED NOT NULL,
  `chapterID` int(10) UNSIGNED DEFAULT NULL,
  `lessonID` int(10) UNSIGNED DEFAULT NULL,
  `time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `course_of_student`
--

INSERT INTO `course_of_student` (`studentID`, `courseID`, `chapterID`, `lessonID`, `time`) VALUES
(1, 1, NULL, NULL, NULL),
(2, 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `course_of_teacher`
--

CREATE TABLE `course_of_teacher` (
  `teacherID` int(10) UNSIGNED NOT NULL,
  `courseID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `course_of_teacher`
--

INSERT INTO `course_of_teacher` (`teacherID`, `courseID`) VALUES
(1, 3),
(1, 4),
(3, 1),
(3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `history_lesson`
--

CREATE TABLE `history_lesson` (
  `chapterID` int(11) DEFAULT NULL,
  `lessonID` int(11) DEFAULT NULL,
  `time` time DEFAULT NULL,
  `courseID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `history_lesson`
--

INSERT INTO `history_lesson` (`chapterID`, `lessonID`, `time`, `courseID`, `studentID`) VALUES
(1, 2, '17:21:00', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `lesson`
--

CREATE TABLE `lesson` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(250) NOT NULL,
  `chapterID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'student'),
(3, 'teacher'),
(4, 'guest');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `id` int(10) UNSIGNED NOT NULL,
  `star` int(10) UNSIGNED NOT NULL,
  `feedback` text DEFAULT NULL,
  `courseID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`id`, `star`, `feedback`, `courseID`, `studentID`, `time`) VALUES
(1, 2, 'hello', 2, 1, '2022-12-16 08:33:51'),
(2, 5, 'hekko', 1, 2, '2022-12-15 08:42:43'),
(3, 3, 'fasfas', 1, 3, '2022-12-14 13:42:43');

-- --------------------------------------------------------

--
-- Table structure for table `student_love_course`
--

CREATE TABLE `student_love_course` (
  `studentID` int(10) UNSIGNED NOT NULL,
  `courseID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student_love_course`
--

INSERT INTO `student_love_course` (`studentID`, `courseID`) VALUES
(1, 1),
(2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `permissionID` int(10) UNSIGNED NOT NULL,
  `about` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `password`, `email`, `permissionID`, `about`) VALUES
(1, 'manhtu227', '', 'manhtu2272002@gmail.com', 2, NULL),
(2, 'lavy2905', 'langg', 'lavy@gmail.com', 2, NULL),
(3, 'Jonas Schmedtmann', 'dfhgfhfg', 'quangtrung@gmail.com', 3, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `chapter`
--
ALTER TABLE `chapter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`),
  ADD KEY `idCategory_idx` (`idCategory`);

--
-- Indexes for table `course_of_student`
--
ALTER TABLE `course_of_student`
  ADD PRIMARY KEY (`studentID`,`courseID`);

--
-- Indexes for table `course_of_teacher`
--
ALTER TABLE `course_of_teacher`
  ADD PRIMARY KEY (`teacherID`,`courseID`);

--
-- Indexes for table `history_lesson`
--
ALTER TABLE `history_lesson`
  ADD PRIMARY KEY (`studentID`,`courseID`);

--
-- Indexes for table `lesson`
--
ALTER TABLE `lesson`
  ADD PRIMARY KEY (`id`,`chapterID`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idpermission_UNIQUE` (`id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `student_love_course`
--
ALTER TABLE `student_love_course`
  ADD PRIMARY KEY (`studentID`,`courseID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `chapter`
--
ALTER TABLE `chapter`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `lesson`
--
ALTER TABLE `lesson`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
