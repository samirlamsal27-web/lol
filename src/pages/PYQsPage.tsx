@@ .. @@
 import React, { useState } from 'react';
-import { FileText, Download, Search, Filter, Clock, Eye, Star } from 'lucide-react';
+import { FileText, Download, Search, Filter, Clock, Eye, Star, Upload, Plus } from 'lucide-react';
 import { useAuth } from '../contexts/AuthContext';
@@ .. @@
   rating: number;
   createdAt: string;
+  solutions?: Solution[];
+}
+
+interface Solution {
+  id: string;
+  title: string;
+  fileUrl: string;
+  fileType: 'pdf' | 'doc';
+  author: {
+    name: string;
+    faculty: string;
+  };
+  createdAt: string;
 }
@@ .. @@
 export default function PYQsPage() {
   const { user } = useAuth();
   const [searchTerm, setSearchTerm] = useState('');
   const [filterSubject, setFilterSubject] = useState('');
   const [filterYear, setFilterYear] = useState('');
   const [filterType, setFilterType] = useState('');
+  const [showUploadModal, setShowUploadModal] = useState(false);
+  const [showSolutionsModal, setShowSolutionsModal] = useState<string | null>(null);
+  const [pyqsList, setPyqsList] = useState<PYQ[]>([]);
@@ .. @@
   // Sample PYQs data
-  const pyqs: PYQ[] = [
+  React.useEffect(() => {
+    const samplePyqs: PYQ[] = [
     {
       id: '1',
       title: 'Physics Board Exam 2023',
@@ .. @@
       downloads: 1100,
       rating: 4.7,
       createdAt: '2024-01-05T16:45:00Z'
     }
   ];
+    setPyqsList(samplePyqs);
+  }, []);
@@ .. @@
   // Filter PYQs by user's faculty and search/filter criteria
-  const filteredPYQs = pyqs.filter(pyq => {
+  const filteredPYQs = pyqsList.filter(pyq => {
     const matchesFaculty = pyq.faculty === user?.faculty;
     const matchesSearch = pyq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pyq.subject.toLowerCase().includes(searchTerm.toLowerCase());
@@ .. @@
   });
 
   // Get unique values for filters
-  const subjects = [...new Set(pyqs.filter(p => p.faculty === user?.faculty).map(p => p.subject))];
-  const years = [...new Set(pyqs.map(p => p.year))].sort((a, b) => parseInt(b) - parseInt(a));
+  const subjects = [...new Set(pyqsList.filter(p => p.faculty === user?.faculty).map(p => p.subject))];
+  const years = [...new Set(pyqsList.map(p => p.year))].sort((a, b) => parseInt(b) - parseInt(a));
   const types = ['Board Exam', 'Model Question', 'Important Questions'];
@@ .. @@
     ));
   };
 
+  const addPYQ = (pyqData: Omit<PYQ, 'id' | 'downloads' | 'rating' | 'createdAt'>) => {
+    const newPYQ: PYQ = {
+      ...pyqData,
+      id: Date.now().toString(),
+      downloads: 0,
+      rating: 0,
+      createdAt: new Date().toISOString()
+    };
+    setPyqsList(prev => [newPYQ, ...prev]);
+  };
+
   return (
     <div className="max-w-6xl mx-auto p-6">
       {/* Header */}
-      <div className="mb-6">
-        <h1 className="text-2xl font-bold text-gray-900 mb-2">Past Year Questions & Important Questions</h1>
-        <p className="text-gray-600">Access previous year questions and important questions for {user?.faculty} faculty</p>
+      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
+        <div>
+          <h1 className="text-2xl font-bold text-gray-900 mb-2">Past Year Questions & Important Questions</h1>
+          <p className="text-gray-600">Access previous year questions and important questions for {user?.faculty} faculty</p>
+        </div>
+        <button
+          onClick={() => setShowUploadModal(true)}
+          className="mt-4 sm:mt-0 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
+        >
+          <Upload className="h-4 w-4" />
+          <span>Upload PYQ</span>
+        </button>
       </div>
@@ .. @@
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
-          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
+          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
         />
       </div>
       <select
         value={filterSubject}
         onChange={(e) => setFilterSubject(e.target.value)}
-        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
+        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
       >
         <option value="">All Subjects</option>
         {subjects.map(subject => (
@@ .. @@
       <select
         value={filterYear}
        onChange={(e) => setFilterYear(e.target.value)}
-        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
+        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
       >
         <option value="">All Years</option>
         {years.map(year => (
@@ .. @@
       <select
         value={filterType}
         onChange={(e) => setFilterType(e.target.value)}
-        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
+        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
       >
         <option value="">All Types</option>
         {types.map(type => (
@@ .. @@
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
         <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
-          <div className="text-2xl font-bold text-blue-600">{filteredPYQs.length}</div>
+          <div className="text-2xl font-bold text-primary-600">{filteredPYQs.length}</div>
           <div className="text-sm text-gray-600">Available Papers</div>
         </div>
         <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
-          <div className="text-2xl font-bold text-green-600">{subjects.length}</div>
+          <div className="text-2xl font-bold text-secondary-600">{subjects.length}</div>
           <div className="text-sm text-gray-600">Subjects Covered</div>
         </div>
         <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
-          <div className="text-2xl font-bold text-orange-600">{years.length}</div>
+          <div className="text-2xl font-bold text-primary-600">{years.length}</div>
           <div className="text-sm text-gray-600">Years Available</div>
         </div>
         <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
-          <div className="text-2xl font-bold text-purple-600">
+          <div className="text-2xl font-bold text-secondary-600">
             {filteredPYQs.reduce((acc, pyq) => acc + pyq.downloads, 0)}
           </div>
           <div className="text-sm text-gray-600">Total Downloads</div>
@@ .. @@
               <div className="flex items-start justify-between mb-4">
                 <div className="flex items-center space-x-2">
-                  <FileText className="h-8 w-8 text-blue-600" />
+                  <FileText className="h-8 w-8 text-primary-600" />
                   <div>
                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFacultyColor(pyq.faculty)}`}>
                       {pyq.subject}
@@ .. @@
               </div>
 
-              <div className="flex space-x-2">
-                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-1">
+              <div className="flex flex-col space-y-2">
+                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-1">
                   <Download className="h-3 w-3" />
                   <span>Download</span>
                 </button>
-                <button className="px-3 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
-                  <Eye className="h-3 w-3" />
+                <button 
+                  onClick={() => setShowSolutionsModal(pyq.id)}
+                  className="w-full bg-secondary-600 hover:bg-secondary-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-1"
+                >
+                  <Eye className="h-3 w-3" />
+                  <span>See Solutions</span>
                 </button>
               </div>
             </div>
@@ .. @@
         </div>
       </div>
+
+      {/* Upload PYQ Modal */}
+      {showUploadModal && (
+        <UploadPYQModal
+          onClose={() => setShowUploadModal(false)}
+          onSubmit={(pyqData) => {
+            if (user) {
+              addPYQ({
+                ...pyqData,
+                faculty: user.faculty
+              });
+              setShowUploadModal(false);
+            }
+          }}
+          userFaculty={user?.faculty || ''}
+        />
+      )}
+
+      {/* Solutions Modal */}
+      {showSolutionsModal && (
+        <SolutionsModal
+          pyqId={showSolutionsModal}
+          onClose={() => setShowSolutionsModal(null)}
+        />
+      )}
     </div>
   );
 }
+
+// Upload PYQ Modal Component
+function UploadPYQModal({ 
+  onClose, 
+  onSubmit, 
+  userFaculty 
+}: { 
+  onClose: () => void; 
+  onSubmit: (data: Omit<PYQ, 'id' | 'downloads' | 'rating' | 'createdAt' | 'faculty'>) => void;
+  userFaculty: string;
+}) {
+  const [title, setTitle] = useState('');
+  const [subject, setSubject] = useState('');
+  const [pyqClass, setPyqClass] = useState('');
+  const [year, setYear] = useState('');
+  const [type, setType] = useState<'Board Exam' | 'Model Question' | 'Important Questions'>('Board Exam');
+  const [selectedFile, setSelectedFile] = useState<File | null>(null);
+  const [fileType, setFileType] = useState<'pdf' | 'doc'>('pdf');
+
+  const subjectsByFaculty = {
+    Science: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'],
+    Management: ['Accountancy', 'Economics', 'Business Studies', 'Marketing', 'Finance'],
+    Humanities: ['Sociology', 'Psychology', 'History', 'Geography', 'Political Science'],
+    Law: ['Constitutional Law', 'Criminal Law', 'Civil Law', 'Legal Studies'],
+    Education: ['Teaching Methods', 'Educational Psychology', 'Curriculum Development', 'Pedagogy']
+  };
+
+  const subjects = subjectsByFaculty[userFaculty as keyof typeof subjectsByFaculty] || [];
+  const currentYear = new Date().getFullYear();
+  const years = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());
+
+  const handleSubmit = (e: React.FormEvent) => {
+    e.preventDefault();
+    if (!title.trim() || !subject || !pyqClass || !year || !selectedFile) return;
+
+    const fileUrl = URL.createObjectURL(selectedFile);
+    
+    onSubmit({
+      title,
+      subject,
+      class: pyqClass,
+      year,
+      type,
+      fileUrl,
+      fileType
+    });
+  };
+
+  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
+    const file = e.target.files?.[0];
+    if (file) {
+      setSelectedFile(file);
+      const extension = file.name.split('.').pop()?.toLowerCase();
+      if (extension === 'pdf' || extension === 'doc') {
+        setFileType(extension as 'pdf' | 'doc');
+      }
+    }
+  };
+
+  return (
+    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
+      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
+        <div className="p-6">
+          <h2 className="text-xl font-bold text-gray-900 mb-4">Upload PYQ</h2>
+          <form onSubmit={handleSubmit} className="space-y-4">
+            <div className="grid grid-cols-2 gap-4">
+              <div>
+                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
+                <select
+                  value={subject}
+                  onChange={(e) => setSubject(e.target.value)}
+                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
+                  required
+                >
+                  <option value="">Select subject</option>
+                  {subjects.map(subj => (
+                    <option key={subj} value={subj}>{subj}</option>
+                  ))}
+                </select>
+              </div>
+              <div>
+                <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
+                <select
+                  value={pyqClass}
+                  onChange={(e) => setPyqClass(e.target.value)}
+                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
+                  required
+                >
+                  <option value="">Select class</option>
+                  <option value="11">Class 11</option>
+                  <option value="12">Class 12</option>
+                </select>
+              </div>
+            </div>
+            <div className="grid grid-cols-2 gap-4">
+              <div>
+                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
+                <select
+                  value={year}
+                  onChange={(e) => setYear(e.target.value)}
+                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
+                  required
+                >
+                  <option value="">Select year</option>
+                  {years.map(yr => (
+                    <option key={yr} value={yr}>{yr}</option>
+                  ))}
+                </select>
+              </div>
+              <div>
+                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
+                <select
+                  value={type}
+                  onChange={(e) => setType(e.target.value as 'Board Exam' | 'Model Question' | 'Important Questions')}
+                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
+                  required
+                >
+                  <option value="Board Exam">Board Exam</option>
+                  <option value="Model Question">Model Question</option>
+                  <option value="Important Questions">Important Questions</option>
+                </select>
+              </div>
+            </div>
+            <div>
+              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
+              <input
+                type="text"
+                value={title}
+                onChange={(e) => setTitle(e.target.value)}
+                placeholder="Enter PYQ title"
+                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
+                required
+              />
+            </div>
+            <div>
+              <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
+              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative">
+                <input
+                  type="file"
+                  accept=".pdf,.doc"
+                  onChange={handleFileChange}
+                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
+                  required
+                />
+                {selectedFile ? (
+                  <div>
+                    <div className="text-primary-600 mb-2">
+                      <Upload className="h-8 w-8 mx-auto" />
+                    </div>
+                    <p className="text-gray-900 font-medium">{selectedFile.name}</p>
+                    <p className="text-xs text-gray-500 mt-1">
+                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
+                    </p>
+                  </div>
+                ) : (
+                  <div>
+                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
+                    <p className="text-gray-600">Click to upload or drag and drop</p>
+                    <p className="text-xs text-gray-500 mt-1">PDF, DOC up to 10MB</p>
+                  </div>
+                )}
+              </div>
+            </div>
+            <div className="flex justify-end space-x-3 pt-4">
+              <button
+                type="button"
+                onClick={onClose}
+                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
+              >
+                Cancel
+              </button>
+              <button
+                type="submit"
+                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
+              >
+                Upload PYQ
+              </button>
+            </div>
+          </form>
+        </div>
+      </div>
+    </div>
+  );
+}
+
+// Solutions Modal Component
+function SolutionsModal({ 
+  pyqId, 
+  onClose 
+}: { 
+  pyqId: string; 
+  onClose: () => void; 
+}) {
+  const [solutions, setSolutions] = useState<Solution[]>([]);
+  const [showUploadSolution, setShowUploadSolution] = useState(false);
+
+  // Sample solutions data
+  React.useEffect(() => {
+    const sampleSolutions: Solution[] = [
+      {
+        id: '1',
+        title: 'Complete Solution with Explanations',
+        fileUrl: '#',
+        fileType: 'pdf',
+        author: {
+          name: 'Dr. Raj Kumar',
+          faculty: 'Science'
+        },
+        createdAt: '2024-01-15T10:00:00Z'
+      }
+    ];
+    setSolutions(sampleSolutions);
+  }, [pyqId]);
+
+  return (
+    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
+      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
+        <div className="p-6">
+          <div className="flex justify-between items-center mb-4">
+            <h2 className="text-xl font-bold text-gray-900">Solutions</h2>
+            <div className="flex space-x-2">
+              <button
+                onClick={() => setShowUploadSolution(true)}
+                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
+              >
+                <Plus className="h-4 w-4" />
+                <span>Add Solution</span>
+              </button>
+              <button
+                onClick={onClose}
+                className="text-gray-400 hover:text-gray-600"
+              >
+                ✕
+              </button>
+            </div>
+          </div>
+          
+          {solutions.length > 0 ? (
+            <div className="space-y-4">
+              {solutions.map((solution) => (
+                <div key={solution.id} className="border border-gray-200 rounded-lg p-4">
+                  <div className="flex items-start justify-between">
+                    <div className="flex-1">
+                      <h3 className="font-medium text-gray-900 mb-2">{solution.title}</h3>
+                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
+                        <span>by {solution.author.name}</span>
+                        <span>{new Date(solution.createdAt).toLocaleDateString()}</span>
+                        <span className="uppercase">{solution.fileType}</span>
+                      </div>
+                    </div>
+                    <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1">
+                      <Download className="h-3 w-3" />
+                      <span>Download</span>
+                    </button>
+                  </div>
+                </div>
+              ))}
+            </div>
+          ) : (
+            <div className="text-center py-8 text-gray-500">
+              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
+              <p>No solutions available yet.</p>
+              <p className="text-sm mt-2">Be the first to contribute a solution!</p>
+            </div>
+          )}
+        </div>
+      </div>
+    </div>
+  );
+}