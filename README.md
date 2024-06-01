# Shopify
Shopify theme guide to create customize theme.

## Create Theme from scratch

### Create Folder
Copy and paste below code in command line to create folders and files
```
mkdir assets, config, layout, locales, sections, snippets, templates
```

Create base files
```
cd assets
```
```
touch base.css
```

Create config files
```
cd config
```
```
touch settings_data.json settings_schema.json
```
Create layout files
```
cd layout
```
```
touch password.liquid theme.liquid
```

Create locales files
```
cd locales
```
```
touch en.default.json en.default.schema.json
```

Create templates
```
cd templates
```
```
touch 404.json article.json blog.json cart.json collection.json gift_card.liquid index.json list-collection.json page.about.json page.contact.json page.json password.json product.json search.json
```
```
cd customers
```
```
touch account.json activate_account.json addresses.json login.json order.json register.json reset_password.json
```

As a next step, we need to create main section file for each template
```
touch main-account.liquid main-activate_account.liquid main-addresses.liquid main-login.liquid main-order.liquid main-order.liquid main-register.liquid main-register.liquid main-reset_password.liquid main-404.liquid main-article.liquid main-blog.liquid main-cart.liquid main-collection.liquid mian-list-collections.liquid main-about.liquid main-contact.liquid main-page.liquid header.liquid footer.liquid
```

## List of Pages of Shopify Website
1. Home
2. Single Product
3. Cart
4. Collection
5. Collection List
6. Customers
    - Account (Show Order History, Addresses)
    - Address (Show list of addresses)
    - Login
    - Register
    - Reset Password
    - Activate Account
7. Pages
    - Contact us
    - About us
8. Policies
9. Search
10. 404

## Components with respective files
| Function | Files | Utility |
| --- | --- | --- |
| Predictive Search | predictive-search.js predictive-search.liquid | Provide search functionalities |
| Product Card | product-card.js product-grid-item.liquid | Show case the product information in card style |
| Variant Picker | variant-picker.js | Provide abilty to select variant for product |
| Quantity Input | quantity-input.js | Provide options to change quantity before adding to cart or checkout |
| Cart Notification | cart-notification.js | Notify the customer about the items in cart in popup method |
| Cart Drawer | cart-drawer.js | Notify the customer about the items in cart in drawer method |
| Product Gallery | product-gallery.js | Display product images in single product page with click on zoom functionality |
| Product Quick View | product-quick-view.js | Show the product information in quick view popup |
| Product Carousel | product-carousel.js | Show the list of products in carousel style |

