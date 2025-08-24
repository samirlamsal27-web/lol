@@ .. @@
       {/* Welcome Section */}
-      <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-2xl p-6 mb-8 text-white relative overflow-hidden shadow-xl">
+      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 mb-8 text-white relative overflow-hidden shadow-xl">
         <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
         <div className="relative z-10">
         <h1 className="text-2xl font-bold mb-2">
-          Welcome back, {user?.name}! 🎉✨
+          Welcome back, {user?.name}!
         </h1>
           <p className="text-white/90">
-          Stay updated with the latest discussions and resources in {user?.faculty} 📚
+          Stay updated with the latest discussions and resources in {user?.faculty}
         </p>
         <div className="flex items-center space-x-4 mt-4">
           <div className="flex items-center space-x-2">
               <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
             <span className="text-sm text-white/90">Class {user?.class}</span>
           </div>
           <div className="flex items-center space-x-2">
               <div className="w-2 h-2 bg-green-300 rounded-full animate-bounce"></div>
             <span className="text-sm text-white/90">{user?.faculty} Faculty</span>
           </div>
         </div>
         </div>
       </div>
@@ .. @@
       {/* Tab Navigation */}
-      <div className="flex space-x-1 mb-6 bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 p-1 rounded-2xl shadow-lg">
+      <div className="flex space-x-1 mb-6 bg-gradient-to-r from-primary-100 to-secondary-100 p-1 rounded-2xl shadow-lg">
         <button
           onClick={() => setActiveTab('hot')}
           className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
             activeTab === 'hot'
-              ? 'bg-white text-purple-600 shadow-lg'
-              : 'text-gray-600 hover:text-purple-700 hover:bg-white/50'
+              ? 'bg-white text-primary-600 shadow-lg'
+              : 'text-gray-600 hover:text-primary-700 hover:bg-white/50'
           }`}
         >
           <TrendingUp className="h-4 w-4" />
           <span>🔥 Hot Questions</span>
         </button>
         <button
           onClick={() => setActiveTab('questions')}
           className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
             activeTab === 'questions'
-              ? 'bg-white text-blue-600 shadow-lg'
-              : 'text-gray-600 hover:text-blue-700 hover:bg-white/50'
+              ? 'bg-white text-primary-600 shadow-lg'
+              : 'text-gray-600 hover:text-primary-700 hover:bg-white/50'
           }`}
         >
           <MessageSquare className="h-4 w-4" />
-          <span>💬 Recent Q&A</span>
+          <span>Recent Q&A</span>
         </button>
         <button
           onClick={() => setActiveTab('notes')}
           className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
             activeTab === 'notes'
-              ? 'bg-white text-green-600 shadow-lg'
-              : 'text-gray-600 hover:text-green-700 hover:bg-white/50'
+              ? 'bg-white text-secondary-600 shadow-lg'
+              : 'text-gray-600 hover:text-secondary-700 hover:bg-white/50'
           }`}
         >
           <BookOpen className="h-4 w-4" />
-          <span>📝 Latest Notes</span>
+          <span>Latest Notes</span>
         </button>
       </div>
@@ .. @@
                           <Link
                             to="/questions"
-                            className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors duration-300 hover:scale-105 transform"
+                            className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-300 hover:scale-105 transform"
                           >
-                            View Discussion 💬
+                            View Discussion
                           </Link>
                         </div>
                       </div>
@@ .. @@
             ) : (
               <div className="text-center py-8 text-gray-500">
                 <div className="text-6xl mb-4">🤔</div>
                 <p>No trending questions in your faculty yet.</p>
                 <p className="text-sm mt-2">Be the first to ask something interesting!</p>
               </div>
             )}
@@ .. @@
               <Link
                 to="/questions"
-                className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-all duration-300 hover:scale-105 transform"
+                className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-all duration-300 hover:scale-105 transform"
               >
-                View All ✨
+                View All
               </Link>
             </div>
@@ .. @@
             ) : (
               <div className="text-center py-8 text-gray-500">
-                <div className="text-6xl mb-4">❓</div>
+                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                 <p>No questions in your faculty yet.</p>
                 <p className="text-sm mt-2">Start the conversation!</p>
               </div>
@@ .. @@
               <Link
                 to="/notes"
-                className="text-green-600 hover:text-green-700 text-sm font-medium transition-all duration-300 hover:scale-105 transform"
+                className="text-secondary-600 hover:text-secondary-700 text-sm font-medium transition-all duration-300 hover:scale-105 transform"
               >
-                View All 📚
+                View All
               </Link>
             </div>
@@ .. @@
             ) : (
               <div className="text-center py-8 text-gray-500">
-                <div className="text-6xl mb-4">📚</div>
+                <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                 <p>No notes available in your faculty yet.</p>
                 <p className="text-sm mt-2">Share your knowledge with others!</p>
               </div>