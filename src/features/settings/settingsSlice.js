import { createSlice } from '@reduxjs/toolkit';
import { siteConfig } from '../../config/siteConfig';

const storedSettings = localStorage.getItem('buildzone_settings');
const initialState = storedSettings
  ? JSON.parse(storedSettings)
  : {
      companyName: siteConfig.name,
      tagline: siteConfig.tagline,
      contactEmail: siteConfig.contact.email,
      phone: siteConfig.contact.phone,
      address: siteConfig.contact.address,
      metaTitle: `${siteConfig.name} — Premier Software Engineering & AI Solutions`,
      metaDescription: siteConfig.description,
      socialLinks: { ...siteConfig.social },
      isDirty: false,
    };

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action) => {
      Object.assign(state, action.payload);
      state.isDirty = true;
      localStorage.setItem('buildzone_settings', JSON.stringify(state));
    },
    resetSettings: (state) => {
      localStorage.removeItem('buildzone_settings');
      state.companyName = siteConfig.name;
      state.tagline = siteConfig.tagline;
      state.contactEmail = siteConfig.contact.email;
      state.phone = siteConfig.contact.phone;
      state.address = siteConfig.contact.address;
      state.metaTitle = `${siteConfig.name} — Premier Software Engineering & AI Solutions`;
      state.metaDescription = siteConfig.description;
      state.socialLinks = { ...siteConfig.social };
      state.isDirty = false;
    },
  },
});

export const { updateSettings, resetSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
