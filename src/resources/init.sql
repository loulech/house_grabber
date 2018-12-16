DROP TABLE IF EXISTS `conmunity`;CREATE TABLE `conmunity`(
	`id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
	`city` VARCHAR(50) NOT NULL DEFAULT '成都' COMMENT '城市名称',
	`region_id` INT(11) DEFAULT NULL COMMENT '区域id',
	`region_name` VARCHAR(100) NOT NULL COMMENT '区域名称',
	`title` VARCHAR(200) NOT NULL COMMENT '小区名称',
	`url` VARCHAR(500) NOT NULL COMMENT '小区链家链接',
	`biz_circle` VARCHAR(100) DEFAULT NULL COMMENT '归属商圈名称',
	`price_per_square` BIGINT(20) NOT NULL COMMENT '每平单价',
	`build_year` INT(6) DEFAULT NULL COMMENT '建成年份',
	`house_on_sale` INT(11) NOT NULL DEFAULT 0 COMMENT '正在售卖的房产数量',
	 PRIMARY KEY(`id`),
	 UNIQUE KEY `idx_title_region`(`title`, `region_name`)
)ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COMMENT='小区表';