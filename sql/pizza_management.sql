-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2025 at 09:07 AM
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
(13, 'Margherita', 'Classic simplicity with fresh flavors', 399.00, 'https://i.pinimg.com/736x/57/e7/a1/57e7a19334571946391a7430fcb86202.jpg'),
(14, 'Pepperoni Feast', 'Bold and meaty for pepperoni lovers', 379.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZXgk-eyNjthiEDhXizyJI420bF9JlGxFx9Q&s'),
(15, 'Meat Lover’s', 'Meat Lover’s A carnivore\'s dream come true', 429.00, 'https://cookingwithchefbryan.com/wp-content/uploads/2022/01/Meat-Lovers-Pizza.jpg'),
(16, 'Hawaiian Delight', 'Sweet and savory tropical fusion', 319.00, 'https://goodtimespizzasaginaw.com/wp-content/uploads/2021/01/Hawaiian-Delight.png'),
(17, 'BBQ Chicken', 'Smoky and tangy with a twist', 399.00, 'https://breadboozebacon.com/wp-content/uploads/2023/05/BBQ-Chicken-Pizza-SQUARE.jpg'),
(18, 'Veggie Supreme', 'A garden-fresh vegetarian favorite', 389.00, 'https://www.thursdaynightpizza.com/wp-content/uploads/2022/06/veggie-pizza-side-view-out-of-oven-720x480.png'),
(19, 'Four Cheese', 'Rich, creamy, and cheesy', 379.00, 'https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/123CBE4C-517C-4401-A668-0D0884F45883/Derivates/936C2A3A-0418-4A9A-B116-E338CABE0650.jpg'),
(20, 'Truffle Mushroom', 'Gourmet and earthy flavor', 379.00, 'https://eurorich.ph/cdn/shop/articles/APC_0088.jpg?v=1665678123'),
(21, 'Spicy Inferno', 'For the heat seekers', 389.00, 'https://www.silviocicchi.com/pizzachef/wp-content/uploads/2015/04/pizzainferno.jpg'),
(22, ' Mediterranean', 'Inspired by sun-drenched coasts', 349.00, 'https://www.foodiecrush.com/wp-content/uploads/2022/01/Mediterranean-Pizza-foodiecrush.com-63.jpg');

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
(6, 'Small'),
(7, 'Medium'),
(8, 'Large'),
(9, 'Extra Large');

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
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `created_at`) VALUES
(5, 'test@test.com', '$2y$10$6Z1KaCh5b7G0nVS1ADD8HedIgGV4BqEs2YOcxeH6QwKkH2WJODS6u', '2025-05-05 20:54:17'),
(8, 'vksab78@gmail.com', '$2y$10$U6xE.RkLsBRZGOKSEG1wMOI2OYWRNydFddodO3zstUWOuP7yG2NgC', '2025-05-12 12:39:58'),
(9, 'robbygabutan@gmail.com', '$2y$10$hNXvReBI810a.aykDvW/CekjDpTCAMtiwxnTpIREqEDQhS/6nsiu2', '2025-05-12 13:33:49'),
(12, 'rgabutan08@gmail.com', '$2y$10$D.eHjPtf5Aqtqf0i7Aocj.dIL1NHZtgtABgXxXevzvxRJt1KkL1ni', '2025-05-15 04:10:01');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `pizzas`
--
ALTER TABLE `pizzas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `pizza_sizes`
--
ALTER TABLE `pizza_sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `toppings`
--
ALTER TABLE `toppings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
