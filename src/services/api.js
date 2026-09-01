import { createApi } from '@reduxjs/toolkit/query/react';
import { initialServices } from '../data/services';
import { initialIndustries } from '../data/industries';
import { initialTechnologies } from '../data/technologies';
import { initialProjects } from '../data/projects';
import { initialCaseStudies } from '../data/caseStudies';
import { initialTeam } from '../data/team';
import { initialFaqs } from '../data/faqs';
import { initialTestimonials } from '../data/testimonials';
import { initialBlogs } from '../data/blogs';
import { initialCareers } from '../data/careers';
import { initialLeads } from '../data/leads';

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1').replace(/\/$/, '');

// LocalStorage Persistence Layer for full offline / standalone demo reliability
const getOrSeed = (key, initial) => {
  try {
    const existing = localStorage.getItem(`buildzone_${key}`);
    if (existing) {
      const data = JSON.parse(existing);
      if (Array.isArray(data) && data.length > 0) {
        if (Array.isArray(initial)) {
          const existingIds = new Set(data.map(d => d.id || d.slug));
          const missing = initial.filter(i => !existingIds.has(i.id || i.slug));
          if (missing.length > 0) {
            const merged = [...data, ...missing];
            localStorage.setItem(`buildzone_${key}`, JSON.stringify(merged));
            return merged;
          }
        }
        return data;
      }
      if (data && typeof data === 'object' && Object.keys(data).length > 0) return data;
    }
    localStorage.setItem(`buildzone_${key}`, JSON.stringify(initial));
    return initial;
  } catch (e) {
    return initial;
  }
};

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(`buildzone_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error("Storage error:", e);
  }
};

const customBaseQuery = async ({ url, method = 'GET', body = null, params = null }) => {
  // If a real backend server is provided via environment variables
  if (BASE_URL) {
    try {
      let queryStr = '';
      if (params) {
        queryStr = '?' + new URLSearchParams(params).toString();
      }
      const token = localStorage.getItem('buildzone_auth_token') || localStorage.getItem('buildzone_token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      };

      const res = await fetch(`${BASE_URL}${url}${queryStr}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        return { 
          error: { 
            status: res.status, 
            data: json?.message || json?.error || json || 'Server Error' 
          } 
        };
      }

      // Automatically unwrap standard backend response envelope: { success: true, data: [...], message: "..." }
      const payload = json && typeof json === 'object' && json.data !== undefined ? json.data : json;
      return { data: payload };
    } catch (err) {
      console.warn("Backend API unavailable or network failed, falling back to mock localStorage data", err);
    }
  }

  // Resilient Mock Fallback Engine with Full CRUD simulation
  await new Promise(r => setTimeout(r, 120)); // Subtle realistic latency

  // 1. SERVICES
  if (url.startsWith('/services')) {
    let services = getOrSeed('services', initialServices);
    if (method === 'GET') {
      const parts = url.split('/');
      if (parts[2]) {
        const item = services.find(s => s.slug === parts[2] || s.id === parts[2]);
        return item ? { data: item } : { error: { status: 404, data: 'Service not found' } };
      }
      return { data: services };
    }
    if (method === 'POST') {
      const newService = { ...body, id: `srv-${Date.now()}` };
      services = [newService, ...services];
      saveToStorage('services', services);
      return { data: newService };
    }
    if (method === 'PUT') {
      services = services.map(s => s.id === body.id ? { ...s, ...body } : s);
      saveToStorage('services', services);
      return { data: body };
    }
    if (method === 'DELETE') {
      const id = url.split('/')[2];
      services = services.filter(s => s.id !== id);
      saveToStorage('services', services);
      return { data: { success: true, id } };
    }
  }

  // 2. INDUSTRIES
  if (url.startsWith('/industries')) {
    let industries = getOrSeed('industries', initialIndustries);
    if (method === 'GET') {
      const parts = url.split('/');
      if (parts[2]) {
        const item = industries.find(i => i.slug === parts[2] || i.id === parts[2]);
        return item ? { data: item } : { error: { status: 404, data: 'Industry not found' } };
      }
      return { data: industries };
    }
    if (method === 'POST') {
      const newInd = { ...body, id: `ind-${Date.now()}` };
      industries = [newInd, ...industries];
      saveToStorage('industries', industries);
      return { data: newInd };
    }
    if (method === 'PUT') {
      industries = industries.map(i => i.id === body.id ? { ...i, ...body } : i);
      saveToStorage('industries', industries);
      return { data: body };
    }
    if (method === 'DELETE') {
      const id = url.split('/')[2];
      industries = industries.filter(i => i.id !== id);
      saveToStorage('industries', industries);
      return { data: { success: true, id } };
    }
  }

  // 3. PROJECTS / PORTFOLIO
  if (url.startsWith('/projects')) {
    let projects = getOrSeed('projects', initialProjects);
    if (method === 'GET') {
      const parts = url.split('/');
      if (parts[2]) {
        const item = projects.find(p => p.slug === parts[2] || p.id === parts[2]);
        return item ? { data: item } : { error: { status: 404, data: 'Project not found' } };
      }
      return { data: projects };
    }
    if (method === 'POST') {
      const newProj = { ...body, id: `proj-${Date.now()}` };
      projects = [newProj, ...projects];
      saveToStorage('projects', projects);
      return { data: newProj };
    }
    if (method === 'PUT') {
      projects = projects.map(p => p.id === body.id ? { ...p, ...body } : p);
      saveToStorage('projects', projects);
      return { data: body };
    }
    if (method === 'DELETE') {
      const id = url.split('/')[2];
      projects = projects.filter(p => p.id !== id);
      saveToStorage('projects', projects);
      return { data: { success: true, id } };
    }
  }

  // 4. CASE STUDIES
  if (url.startsWith('/case-studies')) {
    let caseStudies = getOrSeed('caseStudies', initialCaseStudies);
    if (method === 'GET') {
      const parts = url.split('/');
      if (parts[2]) {
        const item = caseStudies.find(c => c.slug === parts[2] || c.id === parts[2]);
        return item ? { data: item } : { error: { status: 404, data: 'Case study not found' } };
      }
      return { data: caseStudies };
    }
    if (method === 'POST') {
      const newCs = { ...body, id: `cs-${Date.now()}` };
      caseStudies = [newCs, ...caseStudies];
      saveToStorage('caseStudies', caseStudies);
      return { data: newCs };
    }
    if (method === 'PUT') {
      caseStudies = caseStudies.map(c => c.id === body.id ? { ...c, ...body } : c);
      saveToStorage('caseStudies', caseStudies);
      return { data: body };
    }
    if (method === 'DELETE') {
      const id = url.split('/')[2];
      caseStudies = caseStudies.filter(c => c.id !== id);
      saveToStorage('caseStudies', caseStudies);
      return { data: { success: true, id } };
    }
  }

  // 5. LEADS / CRM
  if (url.startsWith('/leads')) {
    let leads = getOrSeed('leads', initialLeads);
    if (method === 'GET') {
      const parts = url.split('/');
      if (parts[2]) {
        const item = leads.find(l => l.id === parts[2]);
        return item ? { data: item } : { error: { status: 404, data: 'Lead not found' } };
      }
      return { data: leads };
    }
    if (method === 'POST') {
      const newLead = {
        ...body,
        id: `lead-${Date.now()}`,
        status: body.status || 'New',
        createdDate: new Date().toISOString(),
        activities: [
          { id: `act-${Date.now()}`, type: 'Lead Created', note: `Inquiry submitted via ${body.source || 'Website'}`, timestamp: new Date().toISOString() }
        ]
      };
      leads = [newLead, ...leads];
      saveToStorage('leads', leads);
      return { data: newLead };
    }
    if (method === 'PATCH' || method === 'PUT') {
      leads = leads.map(l => {
        if (l.id === body.id) {
          const acts = l.activities || [];
          if (body.status && body.status !== l.status) {
            acts.unshift({
              id: `act-${Date.now()}`,
              type: 'Status Changed',
              note: `Status updated from ${l.status} to ${body.status}`,
              timestamp: new Date().toISOString()
            });
          }
          if (body.newActivity) {
            acts.unshift({
              id: `act-${Date.now()}`,
              type: body.newActivity.type || 'Note Added',
              note: body.newActivity.note,
              timestamp: new Date().toISOString()
            });
          }
          return { ...l, ...body, activities: acts };
        }
        return l;
      });
      saveToStorage('leads', leads);
      return { data: leads.find(l => l.id === body.id) };
    }
    if (method === 'DELETE') {
      const id = url.split('/')[2];
      leads = leads.filter(l => l.id !== id);
      saveToStorage('leads', leads);
      return { data: { success: true, id } };
    }
  }

  // 6. BLOG
  if (url.startsWith('/blogs')) {
    let blogs = getOrSeed('blogs', initialBlogs);
    if (method === 'GET') {
      const parts = url.split('/');
      if (parts[2]) {
        const item = blogs.find(b => b.slug === parts[2] || b.id === parts[2]);
        return item ? { data: item } : { error: { status: 404, data: 'Post not found' } };
      }
      return { data: blogs };
    }
    if (method === 'POST') {
      const newPost = { ...body, id: `blog-${Date.now()}`, publishedDate: new Date().toISOString().split('T')[0] };
      blogs = [newPost, ...blogs];
      saveToStorage('blogs', blogs);
      return { data: newPost };
    }
    if (method === 'PUT') {
      blogs = blogs.map(b => b.id === body.id ? { ...b, ...body } : b);
      saveToStorage('blogs', blogs);
      return { data: body };
    }
    if (method === 'DELETE') {
      const id = url.split('/')[2];
      blogs = blogs.filter(b => b.id !== id);
      saveToStorage('blogs', blogs);
      return { data: { success: true, id } };
    }
  }

  // 7. CAREERS
  if (url.startsWith('/careers')) {
    let careers = getOrSeed('careers', initialCareers);
    if (method === 'GET') {
      const parts = url.split('/');
      if (parts[2]) {
        const item = careers.find(c => c.slug === parts[2] || c.id === parts[2]);
        return item ? { data: item } : { error: { status: 404, data: 'Job not found' } };
      }
      return { data: careers };
    }
    if (method === 'POST') {
      if (url.includes('/apply')) {
        let apps = getOrSeed('career_applications', []);
        const newApp = { ...body, id: `app-${Date.now()}`, appliedAt: new Date().toISOString() };
        apps.unshift(newApp);
        saveToStorage('career_applications', apps);
        return { data: newApp };
      }
      const newJob = { ...body, id: `job-${Date.now()}` };
      careers = [newJob, ...careers];
      saveToStorage('careers', careers);
      return { data: newJob };
    }
    if (method === 'PUT') {
      careers = careers.map(c => c.id === body.id ? { ...c, ...body } : c);
      saveToStorage('careers', careers);
      return { data: body };
    }
    if (method === 'DELETE') {
      const id = url.split('/')[2];
      careers = careers.filter(c => c.id !== id);
      saveToStorage('careers', careers);
      return { data: { success: true, id } };
    }
  }

  // 8. TEAM
  if (url.startsWith('/team')) {
    let team = getOrSeed('team', initialTeam);
    if (method === 'GET') {
      const parts = url.split('/');
      if (parts[2]) {
        const item = team.find(t => t.id === parts[2]);
        return item ? { data: item } : { error: { status: 404, data: 'Team member not found' } };
      }
      return { data: team };
    }
    if (method === 'POST') {
      const newMember = { ...body, id: `team-${Date.now()}` };
      team = [newMember, ...team];
      saveToStorage('team', team);
      return { data: newMember };
    }
    if (method === 'PUT') {
      team = team.map(t => t.id === body.id ? { ...t, ...body } : t);
      saveToStorage('team', team);
      return { data: body };
    }
    if (method === 'DELETE') {
      const id = url.split('/')[2];
      team = team.filter(t => t.id !== id);
      saveToStorage('team', team);
      return { data: { success: true, id } };
    }
  }

  // 9. TESTIMONIALS
  if (url.startsWith('/testimonials')) {
    let testimonials = getOrSeed('testimonials', initialTestimonials);
    if (method === 'GET') return { data: testimonials };
    if (method === 'POST') {
      const newT = { ...body, id: `test-${Date.now()}` };
      testimonials = [newT, ...testimonials];
      saveToStorage('testimonials', testimonials);
      return { data: newT };
    }
    if (method === 'PUT') {
      testimonials = testimonials.map(t => t.id === body.id ? { ...t, ...body } : t);
      saveToStorage('testimonials', testimonials);
      return { data: body };
    }
    if (method === 'DELETE') {
      const id = url.split('/')[2];
      testimonials = testimonials.filter(t => t.id !== id);
      saveToStorage('testimonials', testimonials);
      return { data: { success: true, id } };
    }
  }

  // 10. FAQS
  if (url.startsWith('/faqs')) {
    let faqs = getOrSeed('faqs', initialFaqs);
    if (method === 'GET') return { data: faqs };
    if (method === 'POST') {
      const newF = { ...body, id: `faq-${Date.now()}` };
      faqs = [newF, ...faqs];
      saveToStorage('faqs', faqs);
      return { data: newF };
    }
    if (method === 'PUT') {
      faqs = faqs.map(f => f.id === body.id ? { ...f, ...body } : f);
      saveToStorage('faqs', faqs);
      return { data: body };
    }
    if (method === 'DELETE') {
      const id = url.split('/')[2];
      faqs = faqs.filter(f => f.id !== id);
      saveToStorage('faqs', faqs);
      return { data: { success: true, id } };
    }
  }

  // 11. TECHNOLOGIES
  if (url.startsWith('/technologies')) {
    let techs = getOrSeed('technologies', initialTechnologies);
    if (method === 'GET') return { data: techs };
    if (method === 'POST') {
      const newTech = { ...body, id: `tech-${Date.now()}` };
      techs = [newTech, ...techs];
      saveToStorage('technologies', techs);
      return { data: newTech };
    }
  }

  // 12. MEDIA
  if (url.startsWith('/media')) {
    const defaultMedia = [
      { id: "med-1", name: "hero-cyber-mesh.png", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80", category: "Hero", size: "1.2 MB", date: "2026-08-30" },
      { id: "med-2", name: "medflow-dashboard.png", url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80", category: "Projects", size: "890 KB", date: "2026-08-29" },
      { id: "med-3", name: "omnistock-telemetry.png", url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80", category: "Projects", size: "1.5 MB", date: "2026-08-28" },
      { id: "med-4", name: "finvault-treasury.png", url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80", category: "Projects", size: "950 KB", date: "2026-08-25" },
    ];
    let media = getOrSeed('media', defaultMedia);
    if (method === 'GET') return { data: media };
    if (method === 'POST') {
      const newM = { ...body, id: `med-${Date.now()}`, date: new Date().toISOString().split('T')[0] };
      media = [newM, ...media];
      saveToStorage('media', media);
      return { data: newM };
    }
    if (method === 'DELETE') {
      const id = url.split('/')[2];
      media = media.filter(m => m.id !== id);
      saveToStorage('media', media);
      return { data: { success: true, id } };
    }
  }

  // 13. APPLICATIONS
  if (url.startsWith('/applications')) {
    let apps = getOrSeed('career_applications', [
      { id: "app-1", name: "Jordan Taylor", email: "jordan.t@example.com", phone: "+1 (555) 234-5678", position: "Senior Full-Stack Engineer", portfolio: "https://github.com/jordantaylor", coverLetter: "Excited about the scalable architecture at BuildZone.", appliedAt: "2026-08-30T10:00:00Z" }
    ]);
    return { data: apps };
  }

  return { data: { success: true } };
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  tagTypes: [
    'Service',
    'Industry',
    'Project',
    'CaseStudy',
    'Lead',
    'Blog',
    'Career',
    'Team',
    'Testimonial',
    'FAQ',
    'Technology',
    'Media',
    'Application',
    'Settings'
  ],
  endpoints: (builder) => ({
    // Services
    getServices: builder.query({
      query: () => '/services',
      providesTags: ['Service'],
    }),
    getServiceBySlug: builder.query({
      query: (slug) => `/services/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Service', id: slug }],
    }),
    createService: builder.mutation({
      query: (body) => ({ url: '/services', method: 'POST', body }),
      invalidatesTags: ['Service'],
    }),
    updateService: builder.mutation({
      query: (body) => ({ url: `/services/${body.id}`, method: 'PUT', body }),
      invalidatesTags: ['Service'],
    }),
    deleteService: builder.mutation({
      query: (id) => ({ url: `/services/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Service'],
    }),

    // Industries
    getIndustries: builder.query({
      query: () => '/industries',
      providesTags: ['Industry'],
    }),
    getIndustryBySlug: builder.query({
      query: (slug) => `/industries/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Industry', id: slug }],
    }),
    createIndustry: builder.mutation({
      query: (body) => ({ url: '/industries', method: 'POST', body }),
      invalidatesTags: ['Industry'],
    }),
    updateIndustry: builder.mutation({
      query: (body) => ({ url: `/industries/${body.id}`, method: 'PUT', body }),
      invalidatesTags: ['Industry'],
    }),
    deleteIndustry: builder.mutation({
      query: (id) => ({ url: `/industries/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Industry'],
    }),

    // Projects
    getProjects: builder.query({
      query: () => '/projects',
      providesTags: ['Project'],
    }),
    getProjectBySlug: builder.query({
      query: (slug) => `/projects/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Project', id: slug }],
    }),
    createProject: builder.mutation({
      query: (body) => ({ url: '/projects', method: 'POST', body }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation({
      query: (body) => ({ url: `/projects/${body.id}`, method: 'PUT', body }),
      invalidatesTags: ['Project'],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({ url: `/projects/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Project'],
    }),

    // Case Studies
    getCaseStudies: builder.query({
      query: () => '/case-studies',
      providesTags: ['CaseStudy'],
    }),
    getCaseStudyBySlug: builder.query({
      query: (slug) => `/case-studies/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'CaseStudy', id: slug }],
    }),
    createCaseStudy: builder.mutation({
      query: (body) => ({ url: '/case-studies', method: 'POST', body }),
      invalidatesTags: ['CaseStudy'],
    }),
    updateCaseStudy: builder.mutation({
      query: (body) => ({ url: `/case-studies/${body.id}`, method: 'PUT', body }),
      invalidatesTags: ['CaseStudy'],
    }),
    deleteCaseStudy: builder.mutation({
      query: (id) => ({ url: `/case-studies/${id}`, method: 'DELETE' }),
      invalidatesTags: ['CaseStudy'],
    }),

    // Leads CRM
    getLeads: builder.query({
      query: () => '/leads',
      providesTags: ['Lead'],
    }),
    getLeadById: builder.query({
      query: (id) => `/leads/${id}`,
      providesTags: (result, error, id) => [{ type: 'Lead', id }],
    }),
    createLead: builder.mutation({
      query: (body) => ({ url: '/leads', method: 'POST', body }),
      invalidatesTags: ['Lead'],
    }),
    updateLeadStatus: builder.mutation({
      query: (body) => ({ url: `/leads/${body.id}`, method: 'PATCH', body }),
      invalidatesTags: ['Lead'],
    }),
    deleteLead: builder.mutation({
      query: (id) => ({ url: `/leads/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Lead'],
    }),

    // Blog
    getBlogs: builder.query({
      query: () => '/blogs',
      providesTags: ['Blog'],
    }),
    getBlogBySlug: builder.query({
      query: (slug) => `/blogs/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Blog', id: slug }],
    }),
    createBlog: builder.mutation({
      query: (body) => ({ url: '/blogs', method: 'POST', body }),
      invalidatesTags: ['Blog'],
    }),
    updateBlog: builder.mutation({
      query: (body) => ({ url: `/blogs/${body.id}`, method: 'PUT', body }),
      invalidatesTags: ['Blog'],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({ url: `/blogs/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Blog'],
    }),

    // Careers
    getCareers: builder.query({
      query: () => '/careers',
      providesTags: ['Career'],
    }),
    getCareerBySlug: builder.query({
      query: (slug) => `/careers/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Career', id: slug }],
    }),
    createCareer: builder.mutation({
      query: (body) => ({ url: '/careers', method: 'POST', body }),
      invalidatesTags: ['Career'],
    }),
    updateCareer: builder.mutation({
      query: (body) => ({ url: `/careers/${body.id}`, method: 'PUT', body }),
      invalidatesTags: ['Career'],
    }),
    deleteCareer: builder.mutation({
      query: (id) => ({ url: `/careers/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Career'],
    }),
    applyForJob: builder.mutation({
      query: (body) => ({ url: '/careers/apply', method: 'POST', body }),
      invalidatesTags: ['Application'],
    }),
    getApplications: builder.query({
      query: () => '/applications',
      providesTags: ['Application'],
    }),

    // Team
    getTeam: builder.query({
      query: () => '/team',
      providesTags: ['Team'],
    }),
    createTeamMember: builder.mutation({
      query: (body) => ({ url: '/team', method: 'POST', body }),
      invalidatesTags: ['Team'],
    }),
    updateTeamMember: builder.mutation({
      query: (body) => ({ url: `/team/${body.id}`, method: 'PUT', body }),
      invalidatesTags: ['Team'],
    }),
    deleteTeamMember: builder.mutation({
      query: (id) => ({ url: `/team/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Team'],
    }),

    // Testimonials
    getTestimonials: builder.query({
      query: () => '/testimonials',
      providesTags: ['Testimonial'],
    }),
    createTestimonial: builder.mutation({
      query: (body) => ({ url: '/testimonials', method: 'POST', body }),
      invalidatesTags: ['Testimonial'],
    }),
    deleteTestimonial: builder.mutation({
      query: (id) => ({ url: `/testimonials/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Testimonial'],
    }),

    // FAQs
    getFaqs: builder.query({
      query: () => '/faqs',
      providesTags: ['FAQ'],
    }),
    createFaq: builder.mutation({
      query: (body) => ({ url: '/faqs', method: 'POST', body }),
      invalidatesTags: ['FAQ'],
    }),
    updateFaq: builder.mutation({
      query: (body) => ({ url: `/faqs/${body.id}`, method: 'PUT', body }),
      invalidatesTags: ['FAQ'],
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({ url: `/faqs/${id}`, method: 'DELETE' }),
      invalidatesTags: ['FAQ'],
    }),

    // Technologies
    getTechnologies: builder.query({
      query: () => '/technologies',
      providesTags: ['Technology'],
    }),
    createTechnology: builder.mutation({
      query: (body) => ({ url: '/technologies', method: 'POST', body }),
      invalidatesTags: ['Technology'],
    }),

    // Media
    getMedia: builder.query({
      query: () => '/media',
      providesTags: ['Media'],
    }),
    uploadMedia: builder.mutation({
      query: (body) => ({ url: '/media', method: 'POST', body }),
      invalidatesTags: ['Media'],
    }),
    deleteMedia: builder.mutation({
      query: (id) => ({ url: `/media/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Media'],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceBySlugQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,

  useGetIndustriesQuery,
  useGetIndustryBySlugQuery,
  useCreateIndustryMutation,
  useUpdateIndustryMutation,
  useDeleteIndustryMutation,

  useGetProjectsQuery,
  useGetProjectBySlugQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,

  useGetCaseStudiesQuery,
  useGetCaseStudyBySlugQuery,
  useCreateCaseStudyMutation,
  useUpdateCaseStudyMutation,
  useDeleteCaseStudyMutation,

  useGetLeadsQuery,
  useGetLeadByIdQuery,
  useCreateLeadMutation,
  useUpdateLeadStatusMutation,
  useDeleteLeadMutation,

  useGetBlogsQuery,
  useGetBlogBySlugQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,

  useGetCareersQuery,
  useGetCareerBySlugQuery,
  useCreateCareerMutation,
  useUpdateCareerMutation,
  useDeleteCareerMutation,
  useApplyForJobMutation,
  useGetApplicationsQuery,

  useGetTeamQuery,
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,

  useGetTestimonialsQuery,
  useCreateTestimonialMutation,
  useDeleteTestimonialMutation,

  useGetFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,

  useGetTechnologiesQuery,
  useCreateTechnologyMutation,

  useGetMediaQuery,
  useUploadMediaMutation,
  useDeleteMediaMutation,
} = api;

export const useSubmitApplicationMutation = useApplyForJobMutation;
export const useApplyJobMutation = useApplyForJobMutation;
