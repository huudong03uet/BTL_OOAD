import mysql.connector
from configparser import ConfigParser
from faker import Faker
import random
import string
import json
from datetime import datetime
import re


fake = Faker()

config = ConfigParser()
config.read('.env')

db_name = config.get('database', 'DB_NAME')
db_user = config.get('database', 'DB_USER')
db_password = config.get('database', 'DB_PASSWORD')
db_host = config.get('database', 'DB_HOST')

with open('products.json', 'r') as file:
    data = json.load(file)

try:
    connection = mysql.connector.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        database=db_name
    )
    if connection.is_connected():
        print('Connected to MySQL database')

    cursor = connection.cursor()

    for _ in range(10):
        country = fake.country()
        address = fake.street_address()
        city = fake.city()
        state = fake.state()
        postal_code = fake.postcode()
        x = random.uniform(-180, 180)  
        y = random.uniform(-90, 90)  

        sql = "INSERT INTO location (country, address, city, state, postal_code, x, y, createdAt, updatedAt) VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), NOW())"
        values = (country, address, city, state, postal_code, x, y)

        cursor.execute(sql, values)

    print('Inserted 10 records into "location" table.')

    connection.commit()

    num_seller = 0

    for i in range(1, 11):
        first_name = fake.first_name()
        last_name = fake.last_name()
        user_name = f'test{i}'
        email = f'test{i}@gmail.com'
        password = '$2b$10$ZsdANjcf3F1KuD65rPU.F.xkZIlJbWsU6P7hqlwWeIM6Dykv4APMO' #abc123
        coin = random.uniform(0, 1000)
        phone = fake.phone_number()
        avatar_path = f'avatar_{i}.jpg'

        user_sql = "INSERT INTO user (first_name, last_name, user_name, password, email, coin, phone, avatar_path, createdAt, updatedAt) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, Now(), Now())"
        user_values = (first_name, last_name, user_name, password, email, coin, phone, avatar_path)
        cursor.execute(user_sql, user_values)

        if random.choice([True, False]):
            user_id = cursor.lastrowid
            num_seller += 1
            seller_name = f'Seller {i}'
            seller_email = email
            seller_description = fake.text()
            seller_phone = fake.phone_number()
            location_id = random.randint(1, 10)

            seller_sql = "INSERT INTO seller (name, email, desciption, phone, createdAt, updatedAt, user_id, location_id) VALUES (%s, %s, %s, %s, Now(), Now(), LAST_INSERT_ID(), %s)"
            seller_values = (seller_name, seller_email, seller_description, seller_phone, location_id)
            cursor.execute(seller_sql, seller_values)
            seller_id = cursor.lastrowid

            update_sql = "UPDATE user SET seller_id = %s, location_id = %s WHERE id = %s"
            update_values = (seller_id, random.randint(1, 10), user_id)
            cursor.execute(update_sql, update_values)
    
    connection.commit()

    for _ in range(10):
        name = fake.company()
        status = random.choice(['public', 'private'])
        time_auction = fake.date_time_this_year()
        condition_coin = random.randint(1, 100)
        description = fake.text()
        time_register = fake.date_time_this_decade()
        location_id = random.randint(1, 10)

        sql = "INSERT INTO auction (name, status, time_auction, condition_coin, description, time_register, createdAt, updatedAt, location_id, seller_id) VALUES (%s, %s, %s, %s, %s, %s, NOW(), NOW(), %s, %s)"
        values = (name, status, time_auction, condition_coin, description, time_register, location_id, random.randint(1, num_seller))

        cursor.execute(sql, values)

    print('Inserted 10 records into "auction" table.')

    connection.commit()

    # num_seller = 6

    for item in data:
        title = item['pageTitle']
        description = item.get('description', fake.text())
        artist = item.get('artist', fake.text())
        createdAt = datetime.now()
        updatedAt = createdAt
        seller_id = random.randint(1, num_seller)
        max_estimate = float(re.sub(r'[^\d.]', '', item['max_estimate']))
        min_estimate = float(re.sub(r'[^\d.]', '', item['min_estimate']))
        numerical_order = random.randint(1, 4) + 1
        status = 'not_yet_sold'

        product_sql = "INSERT INTO product (title, description, artist, createdAt, updatedAt, seller_id, max_estimate, min_estimate, numerical_order, status, auction_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        product_values = (title, description, artist, createdAt, updatedAt, seller_id, max_estimate, min_estimate, numerical_order, status, random.randint(1, 10))
        cursor.execute(product_sql, product_values)

        product_id = cursor.lastrowid

        for path, url in zip(item['path'], item['images']):
            createdAt = datetime.now()
            updatedAt = createdAt

            image_sql = "INSERT INTO image (path, url, createdAt, updatedAt, product_id) VALUES (%s, %s, %s, %s, %s)"
            image_values = (path, url, createdAt, updatedAt, product_id)
            cursor.execute(image_sql, image_values)

        category_name = item.get('category')

        category_check_sql = "SELECT id FROM category WHERE title = %s"
        cursor.execute(category_check_sql, (category_name,))
        existing_category = cursor.fetchone()

        if existing_category:
            category_id = existing_category[0]
        else:
            category_sql = "INSERT INTO category (title, description, createdAt, updatedAt) VALUES (%s, %s, %s, %s)"
            category_values = (category_name, "", createdAt, updatedAt)
            cursor.execute(category_sql, category_values)
            category_id = cursor.lastrowid

        category_product_sql = "INSERT INTO category_product (createdAt, updatedAt, product_id, category_id) VALUES (%s, %s, %s, %s)"
        category_product_values = (createdAt, updatedAt, product_id, category_id)
        cursor.execute(category_product_sql, category_product_values)

    connection.commit()
    cursor.close()

    connection.close()
    print('MySQL connection is closed')
except Exception as e:
    print(f"Error: {e}")
