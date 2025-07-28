import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Code, HelpCircle, Star } from "lucide-react";
import { CommunityPost } from "@shared/schema";

interface CommunityFeedProps {
  posts: CommunityPost[];
  isLoading: boolean;
}

export default function CommunityFeed({ posts, isLoading }: CommunityFeedProps) {
  const getPostIcon = (type: string) => {
    switch (type) {
      case 'contribution': return Code;
      case 'question': return HelpCircle;
      case 'showcase': return Star;
      default: return Code;
    }
  };

  const getPostColor = (type: string) => {
    switch (type) {
      case 'contribution': return 'from-blue-500 to-cyan-500';
      case 'question': return 'from-green-500 to-teal-500';
      case 'showcase': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case 'contribution': return 'Contribution';
      case 'question': return 'Question';
      case 'showcase': return 'Showcase';
      default: return type;
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse dyad-surface dyad-border">
            <CardHeader>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-muted rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded w-full"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
                <div className="h-3 bg-muted rounded w-4/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-40" />
          <h3 className="text-lg font-medium dyad-text mb-2">No posts yet</h3>
          <p className="text-muted-foreground">Be the first to share something with the community!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {posts.map((post) => {
        const IconComponent = getPostIcon(post.type);
        const colorClass = getPostColor(post.type);
        
        return (
          <Card key={post.id} className="dyad-surface dyad-border hover:bg-muted/20 transition-colors">
            <CardHeader>
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${colorClass} rounded-lg flex items-center justify-center`}>
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {getPostTypeLabel(post.type)}
                    </Badge>
                    <span className="text-xs dyad-text-muted">
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Just now'}
                    </span>
                  </div>
                  <CardTitle className="dyad-text text-lg">{post.title}</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-xs">
                        {post.authorId ? post.authorId.slice(0, 2).toUpperCase() : 'AN'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm dyad-text-muted">Anonymous Developer</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="dyad-text text-sm mb-4 leading-relaxed">
                {post.content as string}
              </p>
              
              {/* Tags */}
              {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {(post.tags as string[]).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              {/* Actions */}
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                  <Heart className="h-4 w-4 mr-1" />
                  <span className="text-xs">{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span className="text-xs">{post.replies}</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500">
                  <Share2 className="h-4 w-4 mr-1" />
                  <span className="text-xs">Share</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
