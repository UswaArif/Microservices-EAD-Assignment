from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

#Configure SQLAlchemy to attach to sql server database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc:///?odbc_connect=DRIVER={ODBC Driver 17 for SQL Server};SERVER=DESKTOP-3QR9G3M\SQLEXPRESS;DATABASE=my_flask_database;Trusted_Connection=yes;'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Task(db.Model):
    __tablename__ = 'Tasks'  
    id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(100), nullable=False)  
    Description = db.Column(db.String(200))  

@app.route('/api/tasks', methods=['GET', 'POST'])
def handle_tasks():
    if request.method == 'GET':
        tasks = Task.query.all()
        tasks_json = [{'id': task.id, 'Name': task.Name, 'Description': task.Description} for task in tasks]
        return jsonify(tasks_json)
    elif request.method == 'POST':
        data = request.json
        task_name = data.get('Name')
        description = data.get('Description')
        if not task_name:
            return jsonify({"error": "Task name is required"}), 400
        new_task = Task(Name=task_name, Description=description)
        try:
            db.session.add(new_task)
            db.session.commit()
            return jsonify({"message": "Task added successfully"}), 200
        except Exception as e:
            db.session.rollback()
            print("Error adding task:", e)
            return jsonify({"error": "Failed to add task. Please try again."}), 500

@app.route('/api/tasks/<int:id>', methods=['PUT', 'DELETE'])
def edit_delete_task(id):
    task = Task.query.get(id)
    if not task:
        return jsonify({"error": "Task not found"}), 404

    if request.method == 'PUT':
        data = request.json
        task_name = data.get('Name')
        description = data.get('Description')
        if task_name:
            task.Name = task_name
        if description:
            task.Description = description
        try:
            db.session.commit()
            return jsonify({"message": "Task updated successfully"}), 200
        except Exception as e:
            db.session.rollback()
            print("Error updating task:", e)
            return jsonify({"error": "Failed to update task. Please try again."}), 500

    elif request.method == 'DELETE':
        try:
            db.session.delete(task)
            db.session.commit()
            return jsonify({"message": "Task deleted successfully"}), 200
        except Exception as e:
            db.session.rollback()
            print("Error deleting task:", e)
            return jsonify({"error": "Failed to delete task. Please try again."}), 500

if __name__ == '__main__':
    app.run(debug=True)
