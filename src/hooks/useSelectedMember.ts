import { useContext } from 'react';
import { SelectedMemberContext } from '@/contexts/SelectedMemberContext';

export function useSelectedMember() {
  const context = useContext(SelectedMemberContext);
  if (!context) {
    throw new Error('useSelectedMember must be used within the SelectedMemberContextProvider');
  }
  return context;
}
