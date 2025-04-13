const { getUserSession } = require('../utils/session.cjs'); // Include the session helper
const db = require('../utils/db.cjs'); // Ensure db connection is used

module.exports = {
  // Get all profiles (Admin-only access)
  async getAllProfiles(event) {
    const session = await getUserSession(event);

    // Ensure only admins can access all profiles
    if (!session || session.role !== 'admin') {
      throw new Error('Unauthorized access. Admin role required.');
    }

    try {
      const [rows] = await db.query('SELECT id, name, email, role FROM users ORDER BY createdAt DESC');
      return rows;
    } catch (error) {
      throw new Error('Error fetching profiles: ' + error.message);
    }
  },

  // Get a specific profile by ID (Admin or Self-Access)
  async getProfileById(id, event) {
    const session = await getUserSession(event);

    // Check if the user is authenticated
    if (!session) {
      throw new Error('Unauthorized access. Please log in.');
    }

    // Check if the user is an admin or trying to view their own profile
    if (session.role !== 'admin' && session.id !== parseInt(id)) {
      throw new Error('Forbidden access. You cannot view other users\' profiles.');
    }

    try {
      const [rows] = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      throw new Error('Error fetching profile: ' + error.message);
    }
  },

  // Update a specific profile (Admin or Self-Access)
  async updateProfile(id, data, event) {
    const session = await getUserSession(event);

    // Ensure the user is logged in
    if (!session) {
      throw new Error('Unauthorized access. Please log in.');
    }

    // Check if the user is an admin or updating their own profile
    if (session.role !== 'admin' && session.id !== parseInt(id)) {
      throw new Error('Forbidden access. You cannot update other users\' profiles.');
    }

    const { name, email, phone, address } = data;

    // Check for missing required fields
    if (!name || !email) {
      throw new Error('Name and email are required to update the profile.');
    }

    try {
      const [result] = await db.query(
        'UPDATE users SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
        [name, email, phone, address, id]
      );

      if (result.affectedRows === 0) {
        throw new Error('Profile update failed. User not found.');
      }

      return { message: 'Profile updated successfully' };
    } catch (error) {
      throw new Error('Error updating profile: ' + error.message);
    }
  },

  // Delete a specific profile (Admin-only)
  async deleteProfile(id, event) {
    const session = await getUserSession(event);

    // Ensure only admin can delete profiles
    if (!session || session.role !== 'admin') {
      throw new Error('Unauthorized access. Admin role required.');
    }

    try {
      const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
        throw new Error('User not found.');
      }

      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting profile: ' + error.message);
    }
  },

  // Ban a specific profile (Admin-only)
  async banProfile(id, event) {
    const session = await getUserSession(event);

    // Ensure only admin can ban profiles
    if (!session || session.role !== 'admin') {
      throw new Error('Unauthorized access. Admin role required.');
    }

    try {
      const [result] = await db.query('UPDATE users SET banned = 1 WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
        throw new Error('User not found or already banned.');
      }

      return { message: 'User banned successfully' };
    } catch (error) {
      throw new Error('Error banning profile: ' + error.message);
    }
  }
};
