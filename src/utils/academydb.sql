-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3307
-- Thời gian đã tạo: Th12 17, 2022 lúc 01:35 PM
-- Phiên bản máy phục vụ: 10.4.25-MariaDB
-- Phiên bản PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `academydb`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(250) NOT NULL,
  `parentID` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `category`
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
-- Cấu trúc bảng cho bảng `chapter`
--

CREATE TABLE `chapter` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(250) COLLATE utf8_bin NOT NULL,
  `courseID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `course`
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
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `course`
--

INSERT INTO `course` (`id`, `name`, `tinyDescription`, `fullDescription`, `fee`, `updateTime`, `image`, `video`, `rated`, `idCategory`, `required`, `benefit`, `status`) VALUES
(0000000001, 'Javascript for Beginners', 'Learn javascript online and supercharge your web design with this Javascript for beginners training course.', 'Take this Javascript training course and start learning Javascript today.\r\n\r\n\"As a business guy I have no place in programming.\" Ten years ago you could have gotten away with that statement. Today you say that to your colleagues and they scoff at you before they go back to their computers to fix real problems and do real work.\r\n\r\nIf you want to do something useful start by learning Javascript . In these days when the browser is central to all computer use knowing \"the language of the browser\" is the most important step. A few years ago Javascript potential was uncertain and many programmers considered it useless. These days however competent programmers have identified Javascript real potential and uses and it has gone from a toy language to the main language of the browser. It has become one of the most useful languages of this era. Every developer needs at least a basic understanding of Javascript. A developer who knows Javascript is the rockstar of the company and is in constant demand by employers. Our online Javascript\r\n\r\ncourse will get you started by teaching all the essential aspects of coding in Javascript. So... what\'s it gonna be? Do you want to supercharge your career and be in constant demand by employers? Do you want to learn how to create dynamic and innovative Javascript documents? Start programming today with our Javascript course for Beginners training and take control of your career.', 299000, '2022-12-15 16:53:21', 'https://securiumsolutions.com/blog/wp-content/uploads/2021/05/Javascript.png', 'https://www.youtube.com/embed/zBPeGR48_vE', '4.3', 1, 'Some basic knowledge of HTML is required for this course.', '<table class=\"table\">\r\n     <thead>\r\n            <tr>\r\n              <th colspan=\"2\">What will you learn</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr>\r\n              <td>\r\n                <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\r\n                Extensive, informative and interesting video lecture\r\n              </td>\r\n              <td>\r\n                <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\r\n                Complete Code demonstrated in lecture\r\n              </td>\r\n            </tr>\r\n            <tr>\r\n              <td>\r\n                <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\r\n                Lab Exercises\r\n              </td>\r\n              <td>\r\n                <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\r\n                Lab Solution Sets\r\n              </td>\r\n            </tr>\r\n            <tr>\r\n              <td>\r\n                <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\r\n                All Powerpoint Demonstrations Used in Course\r\n              </td>\r\n              <td>\r\n                <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\r\n                Instructor contact Email for questions and clarifications\r\n              </td>\r\n            </tr>\r\n            <tr>\r\n              <td>\r\n                <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\r\n                Coverage of all important primary Javascript concepts\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table> ', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `course_of_student`
--

CREATE TABLE `course_of_student` (
  `studentID` int(10) UNSIGNED NOT NULL,
  `courseID` int(10) UNSIGNED NOT NULL,
  `chapterID` int(10) UNSIGNED DEFAULT NULL,
  `lessonID` int(10) UNSIGNED DEFAULT NULL,
  `time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `course_of_teacher`
--

CREATE TABLE `course_of_teacher` (
  `teacherID` int(10) UNSIGNED NOT NULL,
  `courseID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `history_lesson`
--

CREATE TABLE `history_lesson` (
  `chapterID` int(11) DEFAULT NULL,
  `lessonID` int(11) DEFAULT NULL,
  `time` time DEFAULT NULL,
  `courseID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lesson`
--

CREATE TABLE `lesson` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(250) NOT NULL,
  `chapterID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `permission`
--

CREATE TABLE `permission` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rating`
--

CREATE TABLE `rating` (
  `id` int(10) UNSIGNED NOT NULL,
  `star` int(10) UNSIGNED NOT NULL,
  `feedback` text DEFAULT NULL,
  `courseID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `student_love_course`
--

CREATE TABLE `student_love_course` (
  `studentID` int(10) UNSIGNED NOT NULL,
  `courseID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
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
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Chỉ mục cho bảng `chapter`
--
ALTER TABLE `chapter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Chỉ mục cho bảng `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`),
  ADD KEY `idCategory_idx` (`idCategory`);

--
-- Chỉ mục cho bảng `course_of_student`
--
ALTER TABLE `course_of_student`
  ADD PRIMARY KEY (`studentID`,`courseID`);

--
-- Chỉ mục cho bảng `course_of_teacher`
--
ALTER TABLE `course_of_teacher`
  ADD PRIMARY KEY (`teacherID`,`courseID`);

--
-- Chỉ mục cho bảng `history_lesson`
--
ALTER TABLE `history_lesson`
  ADD PRIMARY KEY (`studentID`,`courseID`);

--
-- Chỉ mục cho bảng `lesson`
--
ALTER TABLE `lesson`
  ADD PRIMARY KEY (`id`,`chapterID`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Chỉ mục cho bảng `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idpermission_UNIQUE` (`id`);

--
-- Chỉ mục cho bảng `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Chỉ mục cho bảng `student_love_course`
--
ALTER TABLE `student_love_course`
  ADD PRIMARY KEY (`studentID`,`courseID`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `chapter`
--
ALTER TABLE `chapter`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `course`
--
ALTER TABLE `course`
  MODIFY `id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `lesson`
--
ALTER TABLE `lesson`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
