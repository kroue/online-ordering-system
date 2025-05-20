-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2025 at 03:22 AM
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
-- Database: `pizza_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `crusts`
--

CREATE TABLE `crusts` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crusts`
--

INSERT INTO `crusts` (`id`, `type`) VALUES
(1, 'Thin Crust'),
(2, 'Thick Crust'),
(3, 'Stuffed Crust');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `pizza_name` varchar(255) NOT NULL,
  `size` varchar(50) NOT NULL,
  `crust` varchar(255) NOT NULL,
  `toppings` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Preparing',
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pizzas`
--

CREATE TABLE `pizzas` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pizzas`
--

INSERT INTO `pizzas` (`id`, `name`, `description`, `price`, `image_url`) VALUES
(3, 'Peperonni', 'Pepperoni is an American variety of spicy salami made from cured pork and beef seasoned with paprika and chili peppers.', 299.00, 'https://cdn.romanspizza.co.za/images/root/v2/pizza/pizza-pepperoni-deluxe-pan.png'),
(4, 'Hawaiian', 'Hawaiian pizza is a pizza invented in Canada, topped with pineapple, tomato sauce, mozzarella cheese, and either ham or bacon.', 349.00, 'https://cdn.romanspizza.co.za/images/root/v2/pizza/pizza-hawaiian-pan.png');

-- --------------------------------------------------------

--
-- Table structure for table `pizza_sizes`
--

CREATE TABLE `pizza_sizes` (
  `id` int(11) NOT NULL,
  `size_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pizza_sizes`
--

INSERT INTO `pizza_sizes` (`id`, `size_type`) VALUES
(2, 'Medium'),
(3, 'Small'),
(4, 'Large');

-- --------------------------------------------------------

--
-- Table structure for table `toppings`
--

CREATE TABLE `toppings` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `toppings`
--

INSERT INTO `toppings` (`id`, `name`) VALUES
(1, 'Tomato'),
(2, 'Cheese'),
(3, 'Pineapple');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `address`, `email`, `password`, `created_at`) VALUES
(5, 'John', 'Doe', '123 Main St, Cityville', 'test@test.com', '$2y$10$6Z1KaCh5b7G0nVS1ADD8HedIgGV4BqEs2YOcxeH6QwKkH2WJODS6u', '2025-05-05 20:54:17'),
(6, 'Jane', 'Smith', '456 Oak Ave, Townsville', 'test2@test.com', '$2y$10$uBr/5lGoON5HavdVr1vUFurHG0ncCso.7ZQWIGXxbwiRTjcOP9eBO', '2025-05-12 12:29:51'),
(7, 'Alice', 'Johnson', '789 Pine Rd, Villagetown', 'test3@test.com', '$2y$10$mukY3rmC/b4HFGOtXcgsV.MXEyf47enW4o4qNmp4eztJc6saszh8O', '2025-05-12 12:39:12'),
(8, 'Victor', 'Santos', '101 Maple St, Metrocity', 'vksab78@gmail.com', '$2y$10$U6xE.RkLsBRZGOKSEG1wMOI2OYWRNydFddodO3zstUWOuP7yG2NgC', '2025-05-12 12:39:58'),
(9, 'Robby', 'Gabutan', '202 Elm St, Suburbia', 'robbygabutan@gmail.com', '$2y$10$hNXvReBI810a.aykDvW/CekjDpTCAMtiwxnTpIREqEDQhS/6nsiu2', '2025-05-12 13:33:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crusts`
--
ALTER TABLE `crusts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pizzas`
--
ALTER TABLE `pizzas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pizza_sizes`
--
ALTER TABLE `pizza_sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `toppings`
--
ALTER TABLE `toppings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crusts`
--
ALTER TABLE `crusts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `pizzas`
--
ALTER TABLE `pizzas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pizza_sizes`
--
ALTER TABLE `pizza_sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `toppings`
--
ALTER TABLE `toppings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
