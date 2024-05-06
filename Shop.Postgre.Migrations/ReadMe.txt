select nenu Tools > Nuget Package Manager > Package Manager Console

in new open tab Package Manager Console
execute

PM> Add-Migration Init -Project Shop.Postgre.Migrations
PM> Add-Migration AddCategory -Project Shop.Postgre.Migrations
PM> Add-Migration AddProduct -Project Shop.Postgre.Migrations
PM> Add-Migration AddCategoryReference -Project Shop.Postgre.Migrations
PM> Add-Migration FixImageArch -Project Shop.Postgre.Migrations

PM> Add-Migration Init -Project Shop.Postgre.Migrations
PM> Add-Migration AddImageName -Project Shop.Postgre.Migrations

PM> Update-Database 