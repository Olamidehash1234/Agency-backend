import { validationResult } from 'express-validator';
import { supabase } from '../config/supabase.js';

export const subscribe = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email } = req.body;

    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ email }]);

    if (error) {
      if (error.code === '23505') { // Unique violation
        return res.status(409).json({
          error: 'This email is already subscribed'
        });
      }
      throw error;
    }

    res.status(201).json({
      message: 'Successfully subscribed to newsletter',
      data
    });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({
      error: 'Failed to subscribe to newsletter'
    });
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const { data: subscribers, error } = await supabase
      .from('subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });

    if (error) throw error;

    res.json(subscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({
      error: 'Failed to fetch subscribers'
    });
  }
};