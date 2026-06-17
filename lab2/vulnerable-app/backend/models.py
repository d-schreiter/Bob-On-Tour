"""
Database Models - Same as Lab 1
"""

from database import db
from datetime import datetime


class Todo(db.Model):
    """Todo Model"""
    
    __tablename__ = 'todos'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    completed = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    
    def __repr__(self):
        return f'<Todo {self.id}: {self.title}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'completed': self.completed,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Secret(db.Model):
    """Secret Model - Contains sensitive information that should be protected"""
    
    __tablename__ = 'secrets'
    
    id = db.Column(db.Integer, primary_key=True)
    secret_text = db.Column(db.Text, nullable=False)
    
    def __repr__(self):
        return f'<Secret {self.id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'secret_text': self.secret_text
        }

# Made with Bob
