from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/add_product', methods=['POST'])
def add_product():
    data = request.json
    name = data['name']
    price = data['price']
    quantity = data['quantity']

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)", (name, price, quantity))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Product added successfully'})

if __name__ == '__main__':
    app.run(debug=True)
