"""
Database Configuration
"""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def init_db(app):
    """Initialize the database with the Flask application and pre-populate with example data"""
    db.init_app(app)
    
    with app.app_context():
        from models import Todo, Secret
        
        # Drop all tables and recreate (reset database on each start)
        db.drop_all()
        db.create_all()
        print("Database reset and initialized!")
        
        # Pre-populate with example todos
        example_todos = [
            Todo(
                title="Buy groceries",
                description="Milk, eggs, bread, and vegetables",
                completed=False
            ),
            Todo(
                title="Finish project report",
                description="Complete the Q4 analysis and submit by Friday",
                completed=False
            ),
            Todo(
                title="Call dentist",
                description="Schedule annual checkup appointment",
                completed=True
            ),
            Todo(
                title="Review pull requests",
                description="Check and approve pending PRs on GitHub",
                completed=False
            ),
        ]
        
        # Pre-populate with a secret (this will be exposed via SQL injection)
        secret = Secret(
            secret_text="FLAG{SQL_1nj3ct10n_1s_d4ng3r0us!_Pr0t3ct_Y0ur_D4t4}"
        )
        
        # Add all to database
        for todo in example_todos:
            db.session.add(todo)
        db.session.add(secret)
        
        db.session.commit()
        print(f"Database pre-populated with {len(example_todos)} todos and 1 secret!")

# Made with Bob
