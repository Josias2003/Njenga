CREATE TABLE `aiInsights` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cropId` int NOT NULL,
	`insightType` enum('healthScore','diseaseRisk','yieldPrediction') NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`value` varchar(255),
	`recommendation` text,
	`confidence` decimal(5,2),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `aiInsights_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `alerts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`greenhouseId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`severity` enum('critical','warning') NOT NULL,
	`type` varchar(100),
	`isRead` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `alerts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `automationRules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`zoneId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`triggerType` enum('temperature','humidity','soilMoisture','light','co2') NOT NULL,
	`triggerCondition` enum('greaterThan','lessThan','equals') NOT NULL,
	`triggerValue` decimal(10,2) NOT NULL,
	`action` varchar(255) NOT NULL,
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `automationRules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `crops` (
	`id` int AUTO_INCREMENT NOT NULL,
	`greenhouseId` int NOT NULL,
	`zoneId` int,
	`name` varchar(255) NOT NULL,
	`variety` varchar(255),
	`plantingDate` timestamp,
	`expectedHarvestDate` timestamp,
	`status` enum('planning','growing','harvesting','completed') DEFAULT 'planning',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `crops_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `greenhouses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`location` text,
	`totalArea` decimal(10,2),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `greenhouses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`greenhouseId` int NOT NULL,
	`reportType` enum('yield','waterUsage','productivity') NOT NULL,
	`period` varchar(50),
	`data` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sensors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`zoneId` int NOT NULL,
	`sensorType` enum('temperature','humidity','soilMoisture','light','co2') NOT NULL,
	`value` decimal(10,2) NOT NULL,
	`unit` varchar(50),
	`status` enum('normal','warning','critical') DEFAULT 'normal',
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sensors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `zones` (
	`id` int AUTO_INCREMENT NOT NULL,
	`greenhouseId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`area` decimal(10,2),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `zones_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','farmer','agronomist') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` ADD `selectedRole` enum('farmer','agronomist','admin');