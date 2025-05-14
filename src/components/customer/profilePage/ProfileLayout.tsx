// ProfileLayout.tsx  –  Account screen with live data & editing
import { useEffect, useState } from 'react';
import ProfilePicture from './ProfilePicture';
import UserDetails    from './UserDetails';
import LogoutButton   from './LogoutButton';

interface Profile {
  user_id:       string;
  first_name:    string;
  last_name:     string;
  email:         string;
  phone:         string;
  date_of_birth: string | null;
  created_at:    string;
}

const timeSince = (created: string) => {
  const start = new Date(created);
  const now   = new Date();

  const months = (now.getFullYear() - start.getFullYear()) * 12
               + (now.getMonth()  - start.getMonth());
  if (months <= 0) return 'Less than a month';

  const years = Math.floor(months / 12);
  const rem   = months % 12;

  const y = years  ? `${years} year${years > 1 ? 's' : ''}` : '';
  const m = rem    ? `${rem} month${rem > 1 ? 's' : ''}`   : '';
  return [y, m].filter(Boolean).join(' ');
};

const ProfilePage = () => {
  const userId = localStorage.getItem('punchit_user');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);

  /** fetch on mount **/
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:3001/api/customer/${userId}/profile`)
      .then(r => r.json())
      .then(setProfile)
      .catch(console.error);
  }, [userId]);

  /** local editable copy **/
  const [form, setForm] = useState<Partial<Profile>>({});

  useEffect(() => {
    if (profile) setForm(profile);
  }, [profile]);

  const save = async () => {
    if (!userId || !form) return;
    const { first_name, last_name, phone, date_of_birth } = form;
    const res = await fetch(`http://localhost:3001/api/customer/${userId}`, {
      method : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ first_name, last_name, phone, date_of_birth })
    });
    if (res.ok) {
      setProfile({ ...(profile as Profile), ...form } as Profile);
      setEditing(false);
      alert('Profile updated!');
    } else {
      const j = await res.json();
      alert(j.error || 'Update failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('punchit_user');
    localStorage.removeItem('punchit_userType');
    window.location.href = '/';
  };

  if (!profile) return <p style={{ padding: 40 }}>Loading profile…</p>;

  return (
    <div style={{
      maxWidth: 600, margin: '50px auto', padding: 20,
      border: '1px solid #ddd', borderRadius: 8,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'center'
    }}>
      <ProfilePicture />

      {/* view mode ---------------------------------------------------------- */}
      {!editing && (
        <>
          <UserDetails
            name={`${profile.first_name} ${profile.last_name}`}
            email={profile.email}
            number={profile.phone}
            timeWithCompany={timeSince(profile.created_at)}
          />

          <div style={{ marginTop: 20 }}>
            <button onClick={() => setEditing(true)}
                    style={{ marginRight: 10 }}>Edit</button>
            <LogoutButton onLogout={logout} />
          </div>
        </>
      )}

      {/* edit mode ---------------------------------------------------------- */}
      {editing && (
        <div style={{ marginTop: 20 }}>
          <input
            value={form.first_name || ''}
            onChange={e => setForm({ ...form, first_name: e.target.value })}
            placeholder="First name"
            style={{ display: 'block', margin: '6px auto', padding: 6 }}
          />
          <input
            value={form.last_name || ''}
            onChange={e => setForm({ ...form, last_name: e.target.value })}
            placeholder="Last name"
            style={{ display: 'block', margin: '6px auto', padding: 6 }}
          />
          <input
            value={form.phone || ''}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            placeholder="Phone"
            style={{ display: 'block', margin: '6px auto', padding: 6 }}
          />
          <input
            type="date"
            value={form.date_of_birth ?? ''}
            onChange={e => setForm({ ...form, date_of_birth: e.target.value })}
            style={{ display: 'block', margin: '6px auto', padding: 6 }}
          />

          <div style={{ marginTop: 15 }}>
            <button onClick={save}   style={{ marginRight: 10 }}>Save</button>
            <button onClick={() => { setEditing(false); setForm(profile); }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
