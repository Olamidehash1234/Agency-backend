import { validationResult } from 'express-validator';
import { supabase } from '../config/supabase.js';

export const submitProposal = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      clientName,
      email,
      company,
      projectType,
      budget,
      timeline,
      description
    } = req.body;

    const { data, error } = await supabase
      .from('proposals')
      .insert([{
        client_name: clientName,
        email,
        company,
        project_type: projectType,
        budget,
        timeline,
        description
      }]);

    if (error) throw error;

    res.status(201).json({
      message: 'Proposal submitted successfully',
      data
    });
  } catch (error) {
    console.error('Error submitting proposal:', error);
    res.status(500).json({
      error: 'Failed to submit proposal'
    });
  }
};

export const getProposals = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const { data: proposals, error } = await supabase
      .from('proposals')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(proposals);
  } catch (error) {
    console.error('Error fetching proposals:', error);
    res.status(500).json({
      error: 'Failed to fetch proposals'
    });
  }
};

export const updateProposalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
      .from('proposals')
      .update({ status, updated_at: new Date() })
      .eq('id', id);

    if (error) throw error;

    res.json({
      message: 'Proposal updated successfully',
      data
    });
  } catch (error) {
    console.error('Error updating proposal:', error);
    res.status(500).json({
      error: 'Failed to update proposal'
    });
  }
};