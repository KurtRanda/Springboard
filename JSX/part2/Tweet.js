// src/Tweet.js
import React from 'react';
import './Tweet.css';

function Tweet({ username, name, date, message }) {
  return (
    <div className="tweet">
      <h3>@{username}</h3>
      <h4>{name}</h4>
      <p>{message}</p>
      <small>{date}</small>
    </div>
  );
}

export default Tweet;

