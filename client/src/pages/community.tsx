import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Plus } from "lucide-react";
import { CommunityPost } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/layout/sidebar";
import CommunityFeed from "@/components/community/community-feed";

export default function Community() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostType, setNewPostType] = useState<"contribution" | "question" | "showcase">("contribution");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["/api/community"],
    queryFn: async () => {
      const response = await fetch("/api/community");
      if (!response.ok) throw new Error("Failed to fetch community posts");
      return response.json() as Promise<CommunityPost[]>;
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async (postData: { title: string; content: string; type: string }) => {
      const response = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...postData,
          authorId: "mock-user-id", // In real app, get from auth context
          tags: [],
        }),
      });
      if (!response.ok) throw new Error("Failed to create post");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Post created",
        description: "Your post has been shared with the community!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/community"] });
      setShowNewPost(false);
      setNewPostTitle("");
      setNewPostContent("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both title and content.",
        variant: "destructive",
      });
      return;
    }

    createPostMutation.mutate({
      title: newPostTitle,
      content: newPostContent,
      type: newPostType,
    });
  };

  const postTypes = [
    { id: "contribution", name: "Contribution", icon: "fas fa-code", color: "from-blue-500 to-cyan-500" },
    { id: "question", name: "Question", icon: "fas fa-question-circle", color: "from-green-500 to-teal-500" },
    { id: "showcase", name: "Showcase", icon: "fas fa-star", color: "from-purple-500 to-pink-500" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        projects={[]}
        currentProject={null}
        onProjectSelect={() => {}}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b dyad-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold dyad-text">Community</h1>
              <p className="text-muted-foreground">Connect with fellow developers and share your work</p>
            </div>
            <Button 
              onClick={() => setShowNewPost(!showNewPost)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>

          {showNewPost && (
            <Card className="mb-6 dyad-surface dyad-border">
              <CardHeader>
                <CardTitle className="dyad-text">Create New Post</CardTitle>
                <div className="flex space-x-2">
                  {postTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant={newPostType === type.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewPostType(type.id as any)}
                      className="flex items-center space-x-2"
                    >
                      <i className={`${type.icon} text-sm`} />
                      <span>{type.name}</span>
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Post title..."
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Share your thoughts, code, or ask a question..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={4}
                />
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNewPost(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreatePost}
                    disabled={createPostMutation.isPending}
                  >
                    {createPostMutation.isPending ? "Posting..." : "Post"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex-1 overflow-auto">
          <CommunityFeed posts={posts || []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
