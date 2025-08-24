@@ .. @@
         <button
           onClick={() => setShowUploadModal(true)}
-          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
+          className="mt-4 sm:mt-0 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
         >
           <Upload className="h-4 w-4" />
           <span>Upload Notes</span>
@@ .. @@
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
-           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
+           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
-         className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
+         className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">All Subjects</option>
          {subjects.map(subject => (
@@ .. @@
        <select
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
-         className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
+         className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">All Classes</option>
          <option value="11">Class 11</option>
@@ .. @@
                 <button
                   onClick={() => saveNote(note.id)}
                   className={`p-1 rounded transition-colors ${
-                    note.saved ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'
+                    note.saved ? 'text-primary-600' : 'text-gray-400 hover:text-primary-600'
                   }`}
                 >
                   <Save className={`h-4 w-4 ${note.saved ? 'fill-current' : ''}`} />
@@ .. @@
                   </div>
                 </div>
-                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
+                <button className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                   Download
                 </button>
               </div>
@@ .. @@
 // Upload Notes Modal Component
 function UploadNotesModal({ 
   onClose, 
   onSubmit, 
   userFaculty 
 }: { 
   onClose: () => void; 
-  onSubmit: (data: { title: string; description: string; subject: string; class: string; fileUrl: string; fileType: 'pdf' | 'doc' | 'docx' }) => void;
+  onSubmit: (data: { title: string; description: string; subject: string; class: string; fileUrl: string; fileType: 'pdf' | 'doc' | 'docx'; file?: File }) => void;
   userFaculty: string;
 }) {
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [subject, setSubject] = useState('');
   const [noteClass, setNoteClass] = useState('');
   const [fileType, setFileType] = useState<'pdf' | 'doc' | 'docx'>('pdf');
+  const [selectedFile, setSelectedFile] = useState<File | null>(null);
 
   const subjectsByFaculty = {
     Science: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'],
@@ .. @@
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
-    if (!title.trim() || !description.trim() || !subject || !noteClass) return;
+    if (!title.trim() || !description.trim() || !subject || !noteClass || !selectedFile) return;
 
-    onSubmit({ 
+    // Create a URL for the file (in a real app, you'd upload to a server)
+    const fileUrl = URL.createObjectURL(selectedFile);
+    
+    onSubmit({
       title, 
       description, 
       subject, 
       class: noteClass, 
-      fileUrl: '#', // Placeholder for file upload
-      fileType 
+      fileUrl,
+      fileType,
+      file: selectedFile
     });
   };
 
+  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
+    const file = e.target.files?.[0];
+    if (file) {
+      setSelectedFile(file);
+      // Auto-detect file type
+      const extension = file.name.split('.').pop()?.toLowerCase();
+      if (extension === 'pdf' || extension === 'doc' || extension === 'docx') {
+        setFileType(extension as 'pdf' | 'doc' | 'docx');
+      }
+    }
+  };
+
   return (
     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
       <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
@@ .. @@
                 <select
                   value={subject}
                   onChange={(e) => setSubject(e.target.value)}
-                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
+                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                   required
                 >
                   <option value="">Select subject</option>
@@ .. @@
                 <select
                   value={noteClass}
                   onChange={(e) => setNoteClass(e.target.value)}
-                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
+                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                   required
                 >
                   <option value="">Select class</option>
@@ .. @@
               <input
                 type="text"
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 placeholder="Enter note title"
-                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
+                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                 required
               />
             </div>
@@ .. @@
               <textarea
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 placeholder="Describe what these notes cover..."
-                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
+                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                 rows={4}
                 required
               />
             </div>
-            <div>
-              <label className="block text-sm font-medium text-gray-700 mb-2">File Type</label>
-              <select
-                value={fileType}
-                onChange={(e) => setFileType(e.target.value as 'pdf' | 'doc' | 'docx')}
-                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
-              >
-                <option value="pdf">PDF</option>
-                <option value="doc">DOC</option>
-                <option value="docx">DOCX</option>
-              </select>
-            </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
-              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
-                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
-                <p className="text-gray-600">Click to upload or drag and drop</p>
-                <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
+              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative">
+                <input
+                  type="file"
+                  accept=".pdf,.doc,.docx"
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
+                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
+                  </div>
+                )}
               </div>
             </div>
             <div className="flex justify-end space-x-3 pt-4">
@@ .. @@
               <button
                 type="submit"
-                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
+                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
               >
                 Upload Notes
               </button>