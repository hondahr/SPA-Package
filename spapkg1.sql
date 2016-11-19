-- phpMyAdmin SQL Dump
-- version 4.3.10
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 16, 2016 at 12:36 AM
-- Server version: 5.5.44-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `spapkg1`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `ID` smallint(5) unsigned NOT NULL,
  `Owner` smallint(5) unsigned NOT NULL DEFAULT '0',
  `Name` varchar(64) NOT NULL DEFAULT '',
  `URL` varchar(64) NOT NULL DEFAULT '',
  `MetaTitle` varchar(64) NOT NULL DEFAULT '',
  `MetaDescription` text NOT NULL,
  `MetaKeywords` text NOT NULL,
  `DisplayOrder` smallint(5) unsigned NOT NULL DEFAULT '0',
  `Show` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `Active` tinyint(1) unsigned NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE IF NOT EXISTS `customers` (
  `ID` smallint(5) unsigned NOT NULL,
  `BusinessName` varchar(48) NOT NULL DEFAULT '',
  `FirstName` varchar(48) NOT NULL DEFAULT '',
  `LastName` varchar(48) NOT NULL DEFAULT '',
  `Email` varchar(64) NOT NULL DEFAULT '',
  `Phone` varchar(16) NOT NULL DEFAULT '',
  `BillAddress1` varchar(48) NOT NULL DEFAULT '',
  `BillAddress2` varchar(48) NOT NULL DEFAULT '',
  `BillCity` varchar(32) NOT NULL DEFAULT '',
  `BillState` char(2) NOT NULL DEFAULT '',
  `BillStateOther` varchar(32) NOT NULL DEFAULT '',
  `BillPostal` varchar(16) NOT NULL DEFAULT '',
  `BillCountryCode` char(2) NOT NULL DEFAULT '',
  `ShipAddress1` varchar(48) NOT NULL DEFAULT '',
  `ShipAddress2` varchar(48) NOT NULL DEFAULT '',
  `ShipCity` varchar(32) NOT NULL DEFAULT '',
  `ShipState` char(2) NOT NULL DEFAULT '',
  `ShipStateOther` varchar(32) NOT NULL DEFAULT '',
  `ShipPostal` varchar(16) NOT NULL DEFAULT '',
  `ShipCountryCode` char(2) NOT NULL DEFAULT '',
  `Timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `salt` varchar(32) NOT NULL,
  `password` varchar(40) NOT NULL,
  `salesperson` varchar(32) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`ID`, `BusinessName`, `FirstName`, `LastName`, `Email`, `Phone`, `BillAddress1`, `BillAddress2`, `BillCity`, `BillState`, `BillStateOther`, `BillPostal`, `BillCountryCode`, `ShipAddress1`, `ShipAddress2`, `ShipCity`, `ShipState`, `ShipStateOther`, `ShipPostal`, `ShipCountryCode`, `Timestamp`, `salt`, `password`, `salesperson`) VALUES
(1, 'phpMydev', 'Richard', 'Whitney', 'richard@whitneys.co', '602-334-7771', '5714 E St John Rd', '', 'Scottsdale', 'AZ', '', '85254', 'us', '5714 E St John Rd', '', 'Scottsdale', 'AZ', '', '85254', 'us', '2016-10-11 18:57:03', 'fXZlE4nAgAZ3eZED93WUKicDHdLTZvIG', '87269166b203a74f749b158c884e2c221c8f2552', '');

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE IF NOT EXISTS `logs` (
  `id` int(11) NOT NULL,
  `ip` varchar(20) NOT NULL,
  `ref` varchar(300) NOT NULL,
  `ua` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`id`, `ip`, `ref`, `ua`) VALUES
(1, '192.168.1.17', '/', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36/');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE IF NOT EXISTS `pages` (
  `id` int(11) NOT NULL,
  `link` varchar(100) NOT NULL,
  `heading` varchar(150) NOT NULL,
  `body` text NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` varchar(300) NOT NULL,
  `lastEdit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=767 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `link`, `heading`, `body`, `title`, `description`, `lastEdit`) VALUES
(654, 'login', 'Log In', '<p><input id="login-user" type="text" placeholder="Username"><input id="login-pass" type="password" placeholder="Password"> <button id="login-submit">Log In</button><br></p>', '', '', '2016-10-27 20:41:38'),
(706, 'about', 'About My Website', '<p>This is an amazing website!</p>', 'About My Website', 'About My Website', '2016-11-11 06:10:01'),
(729, 'contact', 'Contact My Company', '<p><span style="font-size: 16pt;" data-mce-style="font-size: 16pt;">Please complete our contact form below:</span></p><div id="contactInfo" class="col-lg-6"><div class="form-wrapper"><span class="label">Your Name:*</span> <label for="name">Your Name:*</label><input id="name" name="name" type="text" value=""></div><div class="form-wrapper"><span class="label">Phone Number:</span> <label for="phone">Phone Number:</label> <input id="phone" name="phone" type="text" value=""></div><div class="form-wrapper"><span class="label">Email Address:*</span> <label for="email">Email Address:*</label> <input id="email" name="email" type="text" value=""></div><span style="font-size: 16pt;" data-mce-style="font-size: 16pt;"><span style="font-size: 16pt;" data-mce-style="font-size: 16pt;"><span style="font-size: 16pt;" data-mce-style="font-size: 16pt;"><br></span></span></span><div class="form-wrapper"><span class="label">Inquiry:</span> <label for="inquiry">Inquiry:*</label> <textarea id="details" name="inquiry"></textarea></div><span style="font-size: 16pt;" data-mce-style="font-size: 16pt;"><span style="font-size: 16pt;" data-mce-style="font-size: 16pt;"><button id="send-request">Submit Request</button></span></span></div>', 'Contact My Company', 'Contact My Company', '2016-11-12 05:36:40'),
(732, 'services/mailing-list', 'My Company Mailing List', '<p><span style="font-size: 16pt;" data-mce-style="font-size: 16pt;">Please complete our mailer form below:</span></p><div id="contactInfo" class="col-lg-12"><div class="form-wrapper"><span class="label">Your Name:*</span> <label for="name">Your Name:*</label><input id="name" name="name" type="text" value=""></div><div class="form-wrapper"><span class="label">Email Address:*</span> <label for="email">Email Address:*</label> <input id="email" name="email" type="text" value=""></div><div>Email Preference:</div><input name="email-type" type="radio" value="text">Text or <input name="email-type" type="radio" value="html"> HTML</div><div><button id="sign-up">Sign Up</button></div>', 'My Company Mailing List', 'My Company Mailing List', '2016-11-12 06:20:31'),
(741, 'login', 'Log In', '<p><input id="login-user" type="text" placeholder="Username"><input id="login-pass" type="password" placeholder="Password"> <button id="login-submit">Log In</button><br></p>', 'Log In', 'Log In', '2016-11-13 18:18:08'),
(763, '', 'My Company Home Page', '<div id="jumbo"><div><img class="img-responsive" src="images/4.jpg" alt="" data-mce-src="images/4.jpg"></div><div><img class="img-responsive" src="images/sale-shirt.jpg" alt="" data-mce-src="images/sale-shirt.jpg"></div><div><img class="img-responsive" src="images/sale-tops.jpg" alt="" data-mce-src="images/sale-tops.jpg"></div></div><h3 style="text-align: center;" data-mce-style="text-align: center;">&nbsp;</h3><h3 style="text-align: center;" data-mce-style="text-align: center;">This site uses <a href="http://kenwheeler.github.io/slick/" data-mce-href="http://kenwheeler.github.io/slick/">Slick</a> - the last carousel you will ever need!</h3>', 'Page meta title goes here', 'Page meta description goes here', '2016-11-14 07:40:13');

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

CREATE TABLE IF NOT EXISTS `subcategories` (
  `ID` smallint(5) unsigned NOT NULL,
  `CategoryID` smallint(5) unsigned NOT NULL DEFAULT '0',
  `Name` varchar(64) NOT NULL DEFAULT '',
  `URL` varchar(128) NOT NULL DEFAULT '',
  `MetaTitle` varchar(128) NOT NULL DEFAULT '',
  `MetaDescription` text NOT NULL,
  `MetaKeywords` text NOT NULL,
  `DisplayOrder` smallint(5) unsigned NOT NULL DEFAULT '0',
  `Show` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `Active` tinyint(1) unsigned NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `topnav`
--

CREATE TABLE IF NOT EXISTS `topnav` (
  `id` int(11) NOT NULL,
  `name` varchar(16) NOT NULL,
  `url` varchar(150) NOT NULL,
  `parent` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `displayorder` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `topnav`
--

INSERT INTO `topnav` (`id`, `name`, `url`, `parent`, `active`, `displayorder`) VALUES
(1, 'Links', '', 0, 1, 1),
(4, 'Contact Us', 'contact', 1, 1, 10),
(5, 'About', 'about', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `hash` varchar(20) NOT NULL,
  `first` varchar(20) NOT NULL,
  `last` varchar(20) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(40) NOT NULL,
  `email` varchar(80) NOT NULL,
  `first_login` datetime NOT NULL,
  `last_login` datetime NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `admin` int(11) NOT NULL,
  `viewonly` varchar(9) NOT NULL,
  `authToken` varchar(40) NOT NULL,
  `salt` varchar(40) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `hash`, `first`, `last`, `username`, `password`, `email`, `first_login`, `last_login`, `created`, `admin`, `viewonly`, `authToken`, `salt`) VALUES
(1, 'kPmkuxWer9ZPLBUa', '', '', '', '236d1fa986de5ad95736cd4df844161908149083', 'rwhitney@phpmydev.com', '0000-00-00 00:00:00', '2016-11-16 00:04:33', '2016-11-15 04:54:10', 1, '', 'MBjmiAWSfXHe6xaY7ct7kaaYYEc3SZHncinbsyUp', 'desSJtMVbBMxkk1DMX1uuRfxRxT80kJ8tbFzlsvY');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`ID`), ADD UNIQUE KEY `salt` (`salt`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `topnav`
--
ALTER TABLE `topnav`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `ID` smallint(5) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `ID` smallint(5) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=767;
--
-- AUTO_INCREMENT for table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `ID` smallint(5) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `topnav`
--
ALTER TABLE `topnav`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
