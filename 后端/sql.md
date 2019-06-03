#### LIKE 与 通配符
模糊查询

通配符

| 通配符 | 描述 |
| --- | --- |
| % | 替代0个或多个字符 |
| _ | 替代一个字符 |
| [charlist] | 字符列中的任何单一字符 |
| [^charlist] | 不在字符列中的任何单一字符 |

```sql
// 选取A以字母"K"结尾的所有记录
Select * from emq where A like '%k';

// 选取A包含"KK"的所有记录
Select * from emq where A like '%kk%';

// 选取A以字母"K"开头的所有记录
Select * from emq where A like 'k%';

// 选取A不包含"KK"的所有记录
Select * from emq where A not like '%kk%';
```

```sql
// 选取 name 以 "G" 开始，然后是一个任意字符，然后是 "o"，然后是一个任意字符，然后是 "le" 的所有网站
Select * from websites where name like 'G_o_le';
```

#### SELECT TOP, LIMIT, ROWNUM
用于规定要返回的记录的数目。

**SQL Server / MS Access 语法**
```sql
SELECT TOP number|percent column_name(s) 
FROM table_name
LIMIT number;

// 返回前50%的记录
SELECT TOP 50 PERCENT * FROM Websites;
```

**MySQL语法**
```sql
SELECT column_name(s)
FROM table_name
LIMIT number;
```

**Oracle 语法**
```sql
SELECT column_name(s)
FROM table_name
WHERE ROWNUM <= number;
```

#### DELETE
删除表中已存在的行。
```sql
// 删除符合条件的行
Delete from emq 
where A='a' and B='b';

// 在不删除表的情况下，删除所有行，着意味着表结构，属性，索引将保持不变
Delete from emq;
Delete * from emq;
```

**！！！注意where子句, where子句规定哪条记录或者哪些记录需要删除，如果省略了，所有记录都将被删除**

#### UPDATE
更新表中已存在的记录。
```sql
Update emq 
set A = 'a', B ='b'
where c='C';
```
**！！！注意where子句, where子句规定哪条记录或者哪些记录需要更新，如果省略了，所有记录都将被更新**

#### INSERT INTO
向表中插入新记录。
```sql
Insert into emq (A, B, C) values ('A', 'B', 'C');
```

#### ORDER BY
默认按照升序对记录进行排序。如果需要按照降序对记录进行排序，您可以使用 DESC 关键字。

```sql
// 默认升序 asc
Select * from emq order by A (asc);

// desc 降序
Select * from emq order by A desc;

// 多值排序: 先按 A 排序，然后按照 B 排序
Select * from emq order by A, B;
```

#### WHERE
WHERE 子句用于提取那些满足指定条件的记录
```sql
Select column_name, column_name 
from table_name 
where column_name operator value;
```
**Where + 条件（筛选行）**
比较运算符包涵：=, >, <, >=, <=, <>（表示不等于）
```sql
Select * from emp where A='名字';
```

**逻辑运算**
优先级：(), not, and, or
```sql
Select * from emp where A > 20 and A < 20;
Select * from emp where A > 20 or A >30;
Select * from emp where not A > 100;
```

**特殊条件**
```sql
// 空值判断: is null
Select * from emp where A is null;

// between and (在 之间的值) 包含上下限
Select * from emp where A between 1500 and 3000;

// in 等于其中某一个
Select * from emp where A in (5000, 3000, 1500);

// Like 模糊查询
Select * from emp where A like 'M%';
```


#### DISTINCT
 DISTINCT关键词用于返回唯一不同的值
```sql
Select distinct column_name, column_name 
from table_name;
```

#### 基本语法
* SELECT - 从数据库中提取数据
* UPDATE - 更新
* DELETE - 删除
* INSERT INTO - 插入新数据
* CREATE DATABASE - 创建新数据库
* ALTER DATABASE - 修改数据库
* CREATE TABLE - 创建新表
* ALTER TABLE - 变更（改变）数据库表
* DROP TABLE - 删除表
* CREATE INDEX - 创建索引（搜索健）
* DROP INDEX - 删除索引

#### SQL 命名约定
* **小写。** 标识符应该全部用小写字母来书写，使用first_name，不是”First_Name“或者”FirstName“
* **数据类型不是名称。** 避免使用仅为数据类型的名字(如text或timestamp)
* **强调单独的单词。** 由多个单词组成的对象名称应该用下划线分隔，例如使用word_count、team_member_id, 而不是wordcount或wordCount。
* **完整的单词，而不是缩写。** 例如使用middle_name，不是mid_nm.
* **使用常用的缩写。** 对于几个长词而言，缩写词比词本身更为常见，比如i18n和l10n，这时使用缩写。
