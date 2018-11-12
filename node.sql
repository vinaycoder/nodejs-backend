-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 29, 2017 at 06:00 AM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `id` int(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `active` varchar(255) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`id`, `name`, `last_name`, `username`, `password`, `email`, `image`, `created_date`, `active`) VALUES
(1, 'Vinay', 'Kumar', 'admin', '$2a$10$yXKmEnifUccwmBTQJv0Ce.3MCU.FUjXCjSo2C47ZywURkneX2muNe', 'vinay@radicalreflex.com', 'vinay.jpg', '2017-12-05', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_homepage_header`
--

CREATE TABLE `tbl_homepage_header` (
  `id` int(255) NOT NULL,
  `header` varchar(255) DEFAULT NULL,
  `sub_header` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `active` varchar(255) DEFAULT '1',
  `created_date` date DEFAULT NULL,
  `modified_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_homepage_header`
--

INSERT INTO `tbl_homepage_header` (`id`, `header`, `sub_header`, `image`, `link`, `active`, `created_date`, `modified_date`) VALUES
(5, 'Hi this is Testing', 'START Bootstrap can HELP you build better websites USING the Bootstrap CSS framework! Just download your template AND START going, NO strings attached!', 'header.jpg', 'google.com', '1', NULL, '2017-12-11'),
(6, 'This is second testing data', 'Hi', 'light-blue-background-design_396130.jpg', 'www.kolan.co.in', '1', '2017-12-08', NULL),
(12, 'Testing', 'test', '1.jpg', 'kolan.co.in', '1', '2017-12-11', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_real`
--

CREATE TABLE `tbl_real` (
  `id` int(25) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_real`
--

INSERT INTO `tbl_real` (`id`, `title`, `description`) VALUES
(1, 'Why do we use it?', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.'),
(3, 'thisdfsd', 'adflsdlfdfgdf'),
(4, 'edwrwer', 'wetwewessssdfsdfsdfsdsdfffdsdffdsfsdfs');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_services`
--

CREATE TABLE `tbl_services` (
  `id` int(255) NOT NULL,
  `heading` varchar(255) DEFAULT NULL,
  `description` tinytext,
  `icon` varchar(255) DEFAULT NULL,
  `active` varchar(255) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_services`
--

INSERT INTO `tbl_services` (`id`, `heading`, `description`, `icon`, `active`) VALUES
(1, 'Sturdy Templates', 'Our templates are updated regularly so they don\'t break.', 'fa fa-4x fa-diamond', '1'),
(2, 'Ready to Ship', 'You can use this theme as is, or you can make changes!', 'fa fa-4x fa-paper-plane', '1'),
(3, 'Up to Date', 'We update dependencies to keep things fresh.', 'fa fa-4x fa-newspaper-o', '1'),
(4, 'Made with Love', 'You have to make your websites with love these days!', 'fa fa-4x fa-heart', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_homepage_header`
--
ALTER TABLE `tbl_homepage_header`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_real`
--
ALTER TABLE `tbl_real`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_services`
--
ALTER TABLE `tbl_services`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_homepage_header`
--
ALTER TABLE `tbl_homepage_header`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `tbl_real`
--
ALTER TABLE `tbl_real`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tbl_services`
--
ALTER TABLE `tbl_services`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
