import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Patient, CreatePatientInput, UpdatePatientInput } from '@/types/patient';

export function usePatients() {
  const [items, setItems] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('patients').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    setItems(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const create = useCallback(async (input: CreatePatientInput) => {
    const { data, error } = await supabase.from('patients').insert(input).select().single();
    if (error) throw error;
    setItems(prev => [data, ...prev]);
    return data;
  }, []);

  const update = useCallback(async (id: string, input: UpdatePatientInput) => {
    const { data, error } = await supabase.from('patients').update(input).eq('id', id).select().single();
    if (error) throw error;
    setItems(prev => prev.map(item => item.id === id ? data : item));
    return data;
  }, []);

  const remove = useCallback(async (id: string) => {
    const { error } = await supabase.from('patients').delete().eq('id', id);
    if (error) throw error;
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  return { items, loading, refresh: fetchAll, create, update, remove };
}
