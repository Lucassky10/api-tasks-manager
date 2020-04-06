-- Host: localhost:8889

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `tasks`
--

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`name`) VALUES
('errt'),
('errt'),
('Ouf'),
('NewOne');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `beginDate` text NOT NULL,
  `endDate` text NOT NULL,
  `status` varchar(255) NOT NULL,
  `tags` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `beginDate`, `endDate`, `status`, `tags`) VALUES
(48, 'Task', '2020-04-02', '2020-04-25', 'UNE TACHE EST REQUISE', '[\"NewOne\"]'),
(58, 'newTask', '11/23/1967', '11/23/2020', 'ANNULEE', '[\"school\", \"deadline\", \"project\"]'),
(64, 'newTask', '11/23/1967', '11/23/2020', 'ACHEVEE', '[\"school\", \"deadline\", \"project\"]'),
(65, 'newTask', '11/23/1967', '11/23/2020', 'ACHEVEE', '[\"school\", \"deadline\", \"project\"]'),
(69, 'My new task', '2020-04-08', '2020-04-26', 'EN COURS', '[\"School\", \"Deadline\", \"Three\"]'),
(70, 'My new task', '2020-04-01', '2020-04-25', 'EN COURS', '[\"School\", \"Deadline\", \"Three\"]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
