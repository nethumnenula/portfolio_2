import styles from './Admin.module.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaGithub,
  FaExternalLinkAlt,
  FaJava,
  FaReact,
  FaCss3,
  FaDesktop,
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaSave,
  FaTimesCircle,
  FaJsSquare,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaUpload,
  FaImage,
  FaSpinner,
} from 'react-icons/fa';
import { SiMysql, SiMongodb, SiExpress, SiTailwindcss, SiTypescript } from 'react-icons/si';
import { MdCode } from 'react-icons/md';

const API_URL = "http://localhost:4000/api/projects";
const UPLOAD_URL = "http://localhost:4000/api/images/upload"; 

function Admin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // Tags input states
  const [techInput, setTechInput] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");
  
  const fileInputRef = useRef(null);
  const dragRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: [],
    github: '',
    demo: '',
    image: '',
    details: {
      date: '',
      role: '',
      status: 'Completed',
      category: '',
      features: [],
    },
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setProjects(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  
  const getIconForTech = (techName) => {
    const techMap = {
      'react': { icon: FaReact, color: '#61DAFB' },
      'react.js': { icon: FaReact, color: '#61DAFB' },
      'javascript': { icon: FaJsSquare, color: '#F7DF1E' },
      'js': { icon: FaJsSquare, color: '#F7DF1E' },
      'typescript': { icon: SiTypescript, color: '#3178C6' },
      'ts': { icon: SiTypescript, color: '#3178C6' },
      'html': { icon: MdCode, color: '#E34F26' },
      'html5': { icon: MdCode, color: '#E34F26' },
      'css': { icon: FaCss3, color: '#1572B6' },
      'css3': { icon: FaCss3, color: '#1572B6' },
      'tailwind': { icon: SiTailwindcss, color: '#06B6D4' },
      'tailwindcss': { icon: SiTailwindcss, color: '#06B6D4' },
      'java': { icon: FaJava, color: '#007396' },
      'node': { icon: FaNodeJs, color: '#339933' },
      'node.js': { icon: FaNodeJs, color: '#339933' },
      'express': { icon: SiExpress, color: '#FFFFFF' },
      'express.js': { icon: SiExpress, color: '#FFFFFF' },
      'python': { icon: FaPython, color: '#3776AB' },
      'mysql': { icon: SiMysql, color: '#4479A1' },
      'mongodb': { icon: SiMongodb, color: '#47A248' },
      'postgresql': { icon: FaDatabase, color: '#4169E1' },
      'postgres': { icon: FaDatabase, color: '#4169E1' },
      'firebase': { icon: FaDatabase, color: '#FFCA28' },
      'supabase': { icon: FaDatabase, color: '#3ECF8E' },
      'javafx': { icon: FaDesktop, color: '#FF6B00' },
      'git': { icon: FaGithub, color: '#F05032' },
      'docker': { icon: FaDesktop, color: '#2496ED' },
      'aws': { icon: FaDesktop, color: '#FF9900' },
      'kubernetes': { icon: FaDesktop, color: '#326CE5' },
    };
    
    const key = techName.toLowerCase().trim();
    return techMap[key] || { icon: MdCode, color: '#8a8a8a' };
  };

  // Image upload function 
  const handleImageUpload = async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, WebP, etc.)');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(UPLOAD_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      
      if (response.data.success) {
        setFormData(prev => ({
          ...prev,
          image: response.data.imageUrl
        }));
      } else {
        alert(response.data.message || 'Failed to upload image');
      }
      
    } catch (error) {
      console.error('Upload error:', error);
      alert(error.response?.data?.message || 'Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // File input change handler
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  // Tags input functions
  const handleAddTech = () => {
    const tech = techInput.trim();
    if (tech && !formData.techStack.includes(tech)) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, tech]
      }));
      setTechInput("");
    }
  };

  const handleRemoveTech = (techToRemove) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(tech => tech !== techToRemove)
    }));
  };

  const handleAddFeature = () => {
    const feature = featuresInput.trim();
    if (feature && !formData.details.features.includes(feature)) {
      setFormData(prev => ({
        ...prev,
        details: {
          ...prev.details,
          features: [...prev.details.features, feature]
        }
      }));
      setFeaturesInput("");
    }
  };

  const handleRemoveFeature = (featureToRemove) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        features: prev.details.features.filter(f => f !== featureToRemove)
      }
    }));
  };

  const handleTechKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTech();
    }
  };

  const handleFeatureKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddFeature();
    }
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        techStack: project.techStack,
        github: project.github,
        demo: project.demo || '',
        image: project.image || '',
        details: {
          date: project.details.date,
          role: project.details.role,
          status: project.details.status,
          category: project.details.category,
          features: project.details.features,
        },
      });
      setTechInput("");
      setFeaturesInput("");
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        techStack: [],
        github: '',
        demo: '',
        image: '',
        details: {
          date: '',
          role: '',
          status: 'Completed',
          category: '',
          features: [],
        },
      });
      setTechInput("");
      setFeaturesInput("");
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setTechInput("");
    setFeaturesInput("");
    setDragActive(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.techStack.length === 0) {
      alert('Please add at least one technology');
      return;
    }
    
    if (formData.details.features.length === 0) {
      alert('Please add at least one feature');
      return;
    }
    
    try {
      if (editingProject) {
        await axios.put(`${API_URL}/${editingProject._id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      handleCloseModal();
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      alert(error.response?.data?.message || 'Failed to save project. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className={styles.admin}>
        <div className={styles.container}>
          <h2 className={styles.pageTitle}>Admin Panel</h2>
          <p className={styles.loadingText}>Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.admin}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.pageTitle}>Admin Panel</h2>
            <p className={styles.subtitle}>Manage your portfolio projects</p>
          </div>
          <button className={styles.addBtn} onClick={() => handleOpenModal()}>
            <FaPlus /> Add New Project
          </button>
        </div>

        {error && (
          <div className={styles.errorBox}>
            <p>{error}</p>
            <button onClick={fetchProjects} className={styles.retryBtn}>
              Retry
            </button>
          </div>
        )}

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Tech Stack</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="6" className={styles.emptyState}>
                    No projects found. Click "Add New Project" to create one.
                  </td>
                </tr>
              ) : (
                projects.map((project, index) => (
                  <tr key={project._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className={styles.projectTitle}>
                        <span>{project.title}</span>
                        <span className={styles.categoryBadge}>
                          {project.details.category}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.techStack}>
                        {project.techStack.slice(0, 3).map((tech, idx) => {
                          const { icon: TechIcon, color } = getIconForTech(tech);
                          return (
                            <span key={idx} className={styles.techBadge}>
                              <TechIcon style={{ color }} />
                              {tech}
                            </span>
                          );
                        })}
                        {project.techStack.length > 3 && (
                          <span className={styles.moreBadge}>
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[project.details.status.toLowerCase().replace(' ', '')]}`}>
                        {project.details.status}
                      </span>
                    </td>
                    <td>{project.details.date}</td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={styles.editBtn}
                          onClick={() => handleOpenModal(project)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(project._id)}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Model */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
              <button className={styles.closeBtn} onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Project Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., E-Commerce Platform"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your project..."
                  required
                />
              </div>

              {/* Image Upload with Drag & Drop */}
              <div className={styles.formGroup}>
                <label>Project Image</label>
                <div 
                  className={`${styles.imageDropZone} ${dragActive ? styles.dragActive : ''} ${formData.image ? styles.hasImage : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploading ? (
                    <div className={styles.uploadingState}>
                      <FaSpinner className={styles.spinner} />
                      <p>Uploading image...</p>
                    </div>
                  ) : formData.image ? (
                    <div className={styles.imagePreviewContainer}>
                      <img src={formData.image} alt="Project preview" />
                      <button
                        type="button"
                        className={styles.removeImageBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData(prev => ({ ...prev, image: '' }));
                        }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <div className={styles.dropZoneContent}>
                      <FaImage className={styles.dropIcon} />
                      <p>Drag & drop an image here</p>
                      <span>or click to browse</span>
                      <small>Supports: JPEG, PNG, WebP (Max 5MB)</small>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                </div>
                {formData.image && !uploading && (
                  <div className={styles.imageUrlWrapper}>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Or paste image URL here"
                      className={styles.imageUrlInput}
                    />
                  </div>
                )}
              </div>

              {/* Tech Stack - Tags Input */}
              <div className={styles.formGroup}>
                <label>Tech Stack *</label>
                <div className={styles.tagsInputWrapper}>
                  <div className={styles.tagsContainer}>
                    {formData.techStack.map((tech, index) => (
                      <span key={index} className={styles.tag}>
                        {tech}
                        <button
                          type="button"
                          className={styles.tagRemove}
                          onClick={() => handleRemoveTech(tech)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyPress={handleTechKeyPress}
                      placeholder={formData.techStack.length === 0 ? "Type a technology and press Enter" : ""}
                      className={styles.tagsInput}
                    />
                  </div>
                  <button
                    type="button"
                    className={styles.addTagBtn}
                    onClick={handleAddTech}
                  >
                    + Add
                  </button>
                </div>
                {formData.techStack.length === 0 && (
                  <small className={styles.helperText}>Add at least one technology</small>
                )}
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>GitHub URL *</label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    placeholder="https://github.com/..."
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Demo URL</label>
                  <input
                    type="url"
                    name="demo"
                    value={formData.demo}
                    onChange={handleInputChange}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Date *</label>
                  <input
                    type="text"
                    name="details.date"
                    value={formData.details.date}
                    onChange={handleInputChange}
                    placeholder="Jan 2024"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Role *</label>
                  <input
                    type="text"
                    name="details.role"
                    value={formData.details.role}
                    onChange={handleInputChange}
                    placeholder="Full Stack Developer"
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Status *</label>
                  <select
                    name="details.status"
                    value={formData.details.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Live">Live</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Category *</label>
                  <input
                    type="text"
                    name="details.category"
                    value={formData.details.category}
                    onChange={handleInputChange}
                    placeholder="Web Application"
                    required
                  />
                </div>
              </div>

              {/* Features - Tags Input */}
              <div className={styles.formGroup}>
                <label>Features *</label>
                <div className={styles.tagsInputWrapper}>
                  <div className={styles.tagsContainer}>
                    {formData.details.features.map((feature, index) => (
                      <span key={index} className={styles.tag}>
                        {feature}
                        <button
                          type="button"
                          className={styles.tagRemove}
                          onClick={() => handleRemoveFeature(feature)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={featuresInput}
                      onChange={(e) => setFeaturesInput(e.target.value)}
                      onKeyPress={handleFeatureKeyPress}
                      placeholder={formData.details.features.length === 0 ? "Type a feature and press Enter" : ""}
                      className={styles.tagsInput}
                    />
                  </div>
                  <button
                    type="button"
                    className={styles.addTagBtn}
                    onClick={handleAddFeature}
                  >
                    + Add
                  </button>
                </div>
                {formData.details.features.length === 0 && (
                  <small className={styles.helperText}>Add at least one feature</small>
                )}
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={handleCloseModal}>
                  <FaTimesCircle /> Cancel
                </button>
                <button type="submit" className={styles.saveBtn}>
                  <FaSave /> {editingProject ? 'Update Project' : 'Add Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;