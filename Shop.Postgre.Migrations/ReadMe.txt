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

PM> Add-Migration Init -Project Shop.Postgre.Migrations
PM> Add-Migration AddImageIsTitle -Project Shop.Postgre.Migrations
PM> Add-Migration FixProperties -Project Shop.Postgre.Migrations
PM> Add-Migration AddPropertiesGroups -Project Shop.Postgre.Migrations
PM> Add-Migration FixPropertiesGroups -Project Shop.Postgre.Migrations
PM> Add-Migration FixTemplate -Project Shop.Postgre.Migrations
PM> Add-Migration RemoveNotMapped -Project Shop.Postgre.Migrations
PM> Add-Migration FixCategory -Project Shop.Postgre.Migrations
PM> Add-Migration FixCategory2 -Project Shop.Postgre.Migrations
PM> Add-Migration FixPropertyProductId -Project Shop.Postgre.Migrations
PM> Add-Migration FixProductDescription -Project Shop.Postgre.Migrations
PM> Add-Migration FixProperty -Project Shop.Postgre.Migrations


PM> Add-Migration AddOrders -Project Shop.Postgre.Migrations
PM> Add-Migration OdrderRemake -Project Shop.Postgre.Migrations
PM> Add-Migration AddShippingOptions -Project Shop.Postgre.Migrations
PM> Add-Migration FixOrders -Project Shop.Postgre.Migrations
PM> Add-Migration FixShippingOptions -Project Shop.Postgre.Migrations
PM> Add-Migration FixDeliveryAddress -Project Shop.Postgre.Migrations
PM> Add-Migration RemoveTempAddress -Project Shop.Postgre.Migrations
PM> Add-Migration AddInfoPages -Project Shop.Postgre.Migrations
PM> Add-Migration AddContactsInfo -Project Shop.Postgre.Migrations
PM> Add-Migration RemovePinterest -Project Shop.Postgre.Migrations

PM> Add-Migration FixImages -Project Shop.Postgre.Migrations
PM> Add-Migration AddBanner -Project Shop.Postgre.Migrations
PM> Add-Migration FixImages2 -Project Shop.Postgre.Migrations
PM> Add-Migration StripePaymentSessions -Project Shop.Postgre.Migrations
PM> Add-Migration RemoveCurrency -Project Shop.Postgre.Migrations

PM> Update-Database 