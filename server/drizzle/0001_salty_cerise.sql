PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_FoodOrder` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`totalPrice` text NOT NULL,
	`status` text DEFAULT 'Pending' NOT NULL,
	`deliveryAddress` text,
	`userId` integer,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_FoodOrder`("id", "totalPrice", "status", "deliveryAddress", "userId", "createdAt", "updatedAt") SELECT "id", "totalPrice", "status", "deliveryAddress", "userId", "createdAt", "updatedAt" FROM `FoodOrder`;--> statement-breakpoint
DROP TABLE `FoodOrder`;--> statement-breakpoint
ALTER TABLE `__new_FoodOrder` RENAME TO `FoodOrder`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_User` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`phoneNumber` text NOT NULL,
	`address` text,
	`role` text DEFAULT 'USER',
	`isVerified` integer DEFAULT false,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
INSERT INTO `__new_User`("id", "email", "password", "phoneNumber", "address", "role", "isVerified", "createdAt", "updatedAt") SELECT "id", "email", "password", "phoneNumber", "address", "role", "isVerified", "createdAt", "updatedAt" FROM `User`;--> statement-breakpoint
DROP TABLE `User`;--> statement-breakpoint
ALTER TABLE `__new_User` RENAME TO `User`;--> statement-breakpoint
CREATE UNIQUE INDEX `User_email_unique` ON `User` (`email`);--> statement-breakpoint
ALTER TABLE `Food` ADD `description` text;--> statement-breakpoint
ALTER TABLE `Food` ADD `image` text;