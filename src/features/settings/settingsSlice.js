import { createSlice } from '@reduxjs/toolkit';
import { siteConfig } from '../../config/siteConfig';

const storedSettings = localStorage.getItem('buildzone_settings');
let parsed = null;
try {
  if (storedSettings) {
    parsed = JSON.parse(storedSettings);
    if (parsed.heroVideoUrl && parsed.heroVideoUrl.includes('dQw4w9WgXcQ')) {
      parsed.heroVideoUrl = 'https://youtu.be/egpm1YixC4Q';
      parsed.heroMediaType = 'video';
    }
  }
} catch (e) {
  parsed = null;
}

const initialState = parsed
  ? parsed
  : {
      companyName: siteConfig.name,
      tagline: siteConfig.tagline,
      contactEmail: siteConfig.contact.email,
      phone: siteConfig.contact.phone,
      address: siteConfig.contact.address,
      metaTitle: `${siteConfig.name} | Best Software Agency in Sialkot`,
      metaDescription: siteConfig.description,
      socialLinks: { ...siteConfig.social },
      heroBgColor: '#F2F2F2',
      heroMediaType: 'video',
      heroVideoUrl: 'https://youtu.be/egpm1YixC4Q',
      servicesVideoUrl: '',
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
      state.metaTitle = `${siteConfig.name} | Best Software Agency in Sialkot`;
      state.metaDescription = siteConfig.description;
      state.socialLinks = { ...siteConfig.social };
      state.heroBgColor = '#F2F2F2';
      state.heroMediaType = 'video';
      state.heroVideoUrl = 'https://youtu.be/egpm1YixC4Q';
      state.servicesVideoUrl = '';
      state.isDirty = false;
    },
  },
});

export const { updateSettings, resetSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
