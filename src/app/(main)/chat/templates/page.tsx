'use client';

import React, { useState } from 'react';
import { BookTemplate, Search, Plus, Copy, Pencil, Trash2, Filter, Bookmark, BookOpen, ArrowLeft, Star } from 'lucide-react';

type TemplateCategory = 'React Basics' | 'Hooks' | 'State Management' | 'Performance' | 'Architecture';

interface Template {
  id: number;
  title: string;
  description: string;
  content: string;
  category: TemplateCategory;
  usageCount: number;
  createdAt: number;
  isFeatured: boolean;
}

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 1,
      title: 'React Component Lifecycle',
      description: 'A comprehensive explanation of React component lifecycle methods and their hooks equivalents',
      content: 'React components go through several lifecycle phases:\n\n1. **Mounting**: When a component is being created and inserted into the DOM\n   - constructor()\n   - getDerivedStateFromProps()\n   - render()\n   - componentDidMount()\n   - Hooks equivalent: useState, useEffect with empty dependency array\n\n2. **Updating**: When a component is being re-rendered\n   - getDerivedStateFromProps()\n   - shouldComponentUpdate()\n   - render()\n   - getSnapshotBeforeUpdate()\n   - componentDidUpdate()\n   - Hooks equivalent: useEffect with dependencies\n\n3. **Unmounting**: When a component is being removed from the DOM\n   - componentWillUnmount()\n   - Hooks equivalent: useEffect cleanup function\n\nIn modern React, functional components with hooks are preferred over class components with lifecycle methods.',
      category: 'React Basics',
      usageCount: 48,
      createdAt: Date.now() - 7776000000, // 90 days ago
      isFeatured: true
    },
    {
      id: 2,
      title: 'useState Hook Guide',
      description: 'Explanation of the useState hook with common patterns and best practices',
      content: 'The useState hook is used to add state to functional components:\n\n```jsx\nimport React, { useState } from \'react\';\n\nfunction Counter() {\n  // Declare a state variable named "count" with initial value 0\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```\n\n**Best Practices:**\n\n1. Use multiple useState calls for unrelated state variables\n2. Use functional updates for state that depends on previous state\n3. Use lazy initialization for expensive computations\n4. Remember that state updates are asynchronous',
      category: 'Hooks',
      usageCount: 87,
      createdAt: Date.now() - 5184000000, // 60 days ago
      isFeatured: true
    },
    {
      id: 3,
      title: 'Context API vs Redux',
      description: 'Comparison between React Context API and Redux for state management',
      content: 'React Context API and Redux are both tools for managing state, but they serve different purposes:\n\n**Context API:**\n- Built into React\n- Simple to set up for small to medium applications\n- Best for static values or infrequently changing state\n- No middleware support out of the box\n- Can lead to performance issues with frequent updates\n- No developer tools by default\n\n**Redux:**\n- External library\n- More boilerplate but scales better for complex applications\n- Designed for frequent updates and complex state\n- Rich middleware ecosystem\n- Better performance for complex state updates\n- Excellent developer tools\n\n**When to use which:**\n- Context API: For simple state, theme, authentication, localization\n- Redux: For complex state logic, frequent updates, middleware needs, large applications',
      category: 'State Management',
      usageCount: 65,
      createdAt: Date.now() - 2592000000, // 30 days ago
      isFeatured: false
    },
    {
      id: 4,
      title: 'React Performance Optimization',
      description: 'Techniques to optimize React application performance',
      content: 'Key React performance optimization techniques:\n\n1. **Memoization:**\n   - Use React.memo for components\n   - Use useMemo for expensive calculations\n   - Use useCallback for event handlers\n\n2. **Code Splitting:**\n   - Use dynamic imports with React.lazy and Suspense\n   - Split code by routes or components\n\n3. **Virtualization:**\n   - Use a virtualized list library for long lists (react-window, react-virtualized)\n   - Only render elements that are in view\n\n4. **Avoid Unnecessary Renders:**\n   - Use appropriate keys in lists\n   - Avoid inline functions in render\n   - Use proper dependency arrays in hooks\n\n5. **State Management:**\n   - Keep state as local as possible\n   - Consider using immutable data structures\n   - Use state batching when applicable\n\n6. **Profiling and Measurement:**\n   - Use React DevTools Profiler\n   - Measure with Performance API\n   - Establish performance budgets',
      category: 'Performance',
      usageCount: 42,
      createdAt: Date.now() - 1296000000, // 15 days ago
      isFeatured: true
    },
    {
      id: 5,
      title: 'React Component Patterns',
      description: 'Overview of common React component design patterns',
      content: 'Common React component patterns:\n\n1. **Compound Components:**\n   Components that work together to form a complete UI\n   ```jsx\n   <Select>\n     <Option value="1">Option 1</Option>\n     <Option value="2">Option 2</Option>\n   </Select>\n   ```\n\n2. **Render Props:**\n   A technique for sharing code between components using a prop whose value is a function\n   ```jsx\n   <DataProvider render={data => (\n     <div>{data.name}</div>\n   )} />\n   ```\n\n3. **Higher-Order Components (HOC):**\n   A function that takes a component and returns a new component\n   ```jsx\n   const EnhancedComponent = withData(WrappedComponent);\n   ```\n\n4. **Custom Hooks:**\n   Extracting component logic into reusable functions\n   ```jsx\n   function useWindowSize() {\n     // Implementation\n     return { width, height };\n   }\n   ```\n\n5. **Context Provider Pattern:**\n   Using React Context to provide data to components\n   ```jsx\n   <ThemeProvider>\n     <App />\n   </ThemeProvider>\n   ```',
      category: 'Architecture',
      usageCount: 36,
      createdAt: Date.now() - 864000000, // 10 days ago
      isFeatured: false
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const categories: TemplateCategory[] = ['React Basics', 'Hooks', 'State Management', 'Performance', 'Architecture'];

  const getCategoryColor = (category: TemplateCategory) => {
    switch(category) {
      case 'React Basics': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Hooks': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'State Management': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Performance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Architecture': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleCopyTemplate = (id: number) => {
    console.log('Copying template', id);
    // In a real app, this would copy the template content to clipboard
    // or add it to the current conversation
  };

  const handleDeleteTemplate = (id: number) => {
    setTemplates(templates.filter(template => template.id !== id));
  };

  const handleToggleFeatured = (id: number) => {
    setTemplates(templates.map(template => 
      template.id === id ? { ...template, isFeatured: !template.isFeatured } : template
    ));
  };

  const filteredTemplates = templates
    .filter(template => 
      (searchQuery === '' || 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .filter(template => selectedCategory === 'all' || template.category === selectedCategory)
    .filter(template => !showFeaturedOnly || template.isFeatured);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <button 
              className="flex items-center text-green-600 dark:text-green-400 hover:underline"
              onClick={() => console.log('Go back to chat history')}
            >
              <ArrowLeft size={16} className="mr-1" />
              <span>Back to Chat History</span>
            </button>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2 flex justify-center items-center">
              <BookTemplate size={24} className="text-green-600 dark:text-green-400 mr-2" />
              Templates
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Reusable content templates for common questions and topics
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button 
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center justify-center"
                  onClick={() => console.log('Create new template')}
                >
                  <Plus size={18} className="mr-1" />
                  New Template
                </button>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center mr-2">
                    <Filter size={16} className="text-gray-500 dark:text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Category:</span>
                  </div>
                  <button
                    className={`px-3 py-1 text-xs rounded-md transition ${selectedCategory === 'all' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    onClick={() => setSelectedCategory('all')}
                  >
                    All
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`px-3 py-1 text-xs rounded-md transition ${selectedCategory === category ? getCategoryColor(category) : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={showFeaturedOnly}
                      onChange={() => setShowFeaturedOnly(!showFeaturedOnly)}
                    />
                    <div className={`w-10 h-5 rounded-full transition ${showFeaturedOnly ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                      <div className={`transform transition duration-200 ease-in-out bg-white rounded-full h-5 w-5 ${showFeaturedOnly ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      <Star size={14} className={`mr-1 ${showFeaturedOnly ? 'text-yellow-400' : 'text-gray-400'}`} />
                      Featured Only
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Templates List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {filteredTemplates.length} Template{filteredTemplates.length !== 1 ? 's' : ''}
              </h2>
              <div className="flex space-x-2">
                {categories.map(category => (
                  <span key={category} className="px-2 py-1 text-xs rounded-md text-gray-600 dark:text-gray-400">
                    {category.split(' ')[0]}: {templates.filter(t => t.category === category).length}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {filteredTemplates.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                No templates found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                {searchQuery ? `No templates matching "${searchQuery}"` : 'No templates in this category'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTemplates.map((template) => (
                <div key={template.id} className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mr-2">
                          {template.title}
                        </h3>
                        {template.isFeatured && (
                          <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                        {template.description}
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span className={`px-2 py-1 rounded-md ${getCategoryColor(template.category)}`}>
                          {template.category}
                        </span>
                        <div className="flex items-center">
                          <BookOpen size={14} className="mr-1" />
                          <span>Used {template.usageCount} times</span>
                        </div>
                        <div className="flex items-center">
                          <Bookmark size={14} className="mr-1" />
                          <span>Created {formatDate(template.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-1">
                      <button 
                        onClick={() => handleToggleFeatured(template.id)}
                        className="p-2 rounded-full text-gray-500 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        title={template.isFeatured ? "Remove from featured" : "Mark as featured"}
                      >
                        <Star size={18} className={template.isFeatured ? "fill-yellow-400 text-yellow-400" : ""} />
                      </button>
                      <button 
                        onClick={() => handleCopyTemplate(template.id)}
                        className="p-2 rounded-full text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        title="Use template"
                      >
                        <Copy size={18} />
                      </button>
                      <button 
                        onClick={() => console.log('Edit template', template.id)}
                        className="p-2 rounded-full text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        title="Edit template"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="p-2 rounded-full text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                        title="Delete template"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <div className="prose dark:prose-invert max-w-none prose-sm">
                      {template.content.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="text-gray-700 dark:text-gray-300 mb-2">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}