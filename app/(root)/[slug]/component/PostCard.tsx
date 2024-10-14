"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronDownIcon,
  Heart,
  MessageCircle,
  UserIcon,
  ReplyIcon,
  SendHorizontal,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Simulated user data (in a real app, this would come from authentication)
const currentUser = {
  id: "user1",
  name: "Current User",
  avatar: "/placeholder.svg?height=32&width=32",
};

// This would also typically come from an API
const postsData = [
  {
    id: "1",
    title: "Keynote Speaker Announcement",
    content:
      "We're excited to announce our keynote speaker for TechConf 2024...",
    date: "2024-05-01",
    images: [
      "/placeholder.svg?height=300&width=400&text=Keynote+1",
      "/placeholder.svg?height=300&width=400&text=Keynote+2",
      "/placeholder.svg?height=300&width=400&text=Keynote+3",
    ],
    likes: ["user2", "user3"],
    comments: [
      {
        id: "1",
        user: "Alice",
        content: "Can't wait to hear the keynote!",
        replies: [],
      },
      {
        id: "2",
        user: "Bob",
        content: "This is going to be amazing!",
        replies: [],
      },
    ],
  },
  {
    id: "2",
    title: "Early Bird Tickets Now Available",
    content: "Get your early bird tickets for TechConf 2024 now and save...",
    date: "2024-05-15",
    images: [
      "/placeholder.svg?height=300&width=400&text=Early+Bird",
      "/placeholder.svg?height=300&width=400&text=Tickets",
    ],
    likes: ["user1", "user3"],
    comments: [
      { id: "1", user: "Charlie", content: "Just got my ticket!", replies: [] },
      {
        id: "2",
        user: "Diana",
        content: "Are group discounts available?",
        replies: [],
      },
    ],
  },
  {
    id: "3",
    title: "Call for Speakers Open",
    content:
      "Are you an industry expert? Submit your speaker proposal for TechConf 2024...",
    date: "2024-06-01",
    images: ["/placeholder.svg?height=300&width=400&text=Call+for+Speakers"],
    likes: ["user2"],
    comments: [
      {
        id: "1",
        user: "Eve",
        content: "Just submitted my proposal!",
        replies: [],
      },
      {
        id: "2",
        user: "Frank",
        content: "What topics are you looking for?",
        replies: [],
      },
    ],
  },
];

function ImageCarousel({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalImages = images.length;

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  return (
    <div className="relative mb-4">
      <Carousel>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full p-0 hover:bg-transparent"
                  >
                    <Image
                      src={image}
                      alt={`${title} - Image ${index + 1}`}
                      width={400}
                      height={300}
                      className="h-64 w-full object-cover"
                    />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                  <div className="relative aspect-video w-[full]">
                    <Image
                      src={images[currentIndex]}
                      alt={`${title} - Image ${currentIndex + 1}`}
                      fill
                      className="rounded-lg object-contain"
                    />
                    {totalImages > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75"
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                          }}
                        >
                          <CarouselPrevious />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75"
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                          }}
                        >
                          <CarouselNext />
                        </Button>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        {totalImages > 1 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    </div>
  );
}

function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");
  const [mentionedUsers, setMentionedUsers] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const [replyTo, setReplyTo] = useState(null); // Track which comment is being replied to

  const isLiked = likes.includes(currentUser.id);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes.filter((id) => id !== currentUser.id));
    } else {
      setLikes([...likes, currentUser.id]);
    }
  };

  const handleAddCommentOrReply = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      if (replyTo) {
        // Handle reply to a comment
        const updatedComments = comments.map((comment) => {
          if (comment.id === replyTo.id) {
            return {
              ...comment,
              replies: [
                ...comment.replies,
                { user: currentUser.name, content: newComment.trim() },
              ],
            };
          }
          return comment;
        });
        setComments(updatedComments);
        setReplyTo(null); // Reset the reply context
      } else {
        // Handle adding a new comment
        const newCommentObj = {
          id: String(comments.length + 1),
          user: currentUser.name,
          content: newComment.trim(),
          replies: [],
        };
        setComments([...comments, newCommentObj]);
      }
      setNewComment("");
      setMentionedUsers([]);
    }
  };

  const handleReplyClick = (comment) => {
    setReplyTo(comment); // Set the comment being replied to
    setNewComment(``); // Clear the textarea for the reply
  };

  const handleCancelReply = () => {
    setReplyTo(null); // Reset the reply context
    setNewComment(""); // Clear the textarea
  };

  const handleMention = (user) => {
    setNewComment(newComment + `@${user} `);
    setMentionedUsers([]);
  };

  return (
    <Card className="mb-8 bg-primary/5">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <p className="text-sm">{new Date(post.date).toLocaleDateString()}</p>
      </CardHeader>
      <CardContent>
        <ImageCarousel images={post.images} title={post.title} />
        <p className="mb-4">{post.content}</p>
        <div className="mb-4 flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`h-8 p-0 ${isLiked && "text-red-500 hover:text-red-600"} px-2 hover:bg-primary/10`}
          >
            <Heart
              className={`mr-1 h-5 w-5 ${isLiked ? "fill-current" : "stroke-current"}`}
            />
            <span className="">{likes.length}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 bg-transparent p-0 px-2 hover:bg-primary/10"
            onClick={() => setShowAllComments(!showAllComments)}
          >
            <MessageCircle className="mr-1 h-5 w-5" />
            <span className="">{comments.length}</span>
          </Button>
        </div>
        <div className="">
          {comments.length > 0 && (
            <Comment
              key={comments[0].id}
              comment={comments[0]}
              onReply={handleReplyClick}
            />
          )}
          {showAllComments &&
            comments
              .slice(1)
              .map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onReply={handleReplyClick}
                />
              ))}
          {comments.length > 1 && (
            <Button
              variant="link"
              onClick={() => setShowAllComments(!showAllComments)}
              className="p-2 text-sm text-primary/50"
            >
              {showAllComments ? "Hide comments" : `View all comments`}
            </Button>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleAddCommentOrReply} className="relative w-full">
          {replyTo && (
            <div className="bg-primary/10 px-2 text-sm rounded-t-md">
              Replying to <strong>{replyTo.user}</strong>
              <Button
                variant="link"
                className="text-xs text-primary/50"
                onClick={handleCancelReply}
              >
                Cancel
              </Button>
            </div>
          )}
          <div className="flex gap-2">
            <Popover open={mentionedUsers.length > 0}>
              <PopoverTrigger asChild>
                <Textarea
                  placeholder={
                    replyTo ? "Write a reply..." : "Add a comment..."
                  }
                  value={newComment}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                  }}
                  className="w-full flex-grow resize-none rounded-none rounded-b-md focus-visible:ring-offset-0"
                  required
                />
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0">
                {mentionedUsers.map((user) => (
                  <Button
                    key={user}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleMention(user)}
                  >
                    <UserIcon className="mr-2 h-4 w-4" />
                    {user}
                  </Button>
                ))}
              </PopoverContent>
            </Popover>
            <Button
              variant="ghost"
              className="absolute bottom-2 right-2 p-2 hover:bg-primary/10 hover:text-blue-300"
              type="submit"
              disabled={!newComment.trim()}
            >
              <SendHorizontal width="20" height="20" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}

function Comment({ comment, onReply }) {
  return (
    <div className="mt-6">
      <div className="flex items-start gap-3 text-sm">
        <Avatar>
          <AvatarFallback>{comment.user[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <p className="text-xs font-semibold">{comment.user}</p>
          <p className="mt-1">{comment.content}</p>
          <Button
            variant="link"
            size="sm"
            className="h-6 px-0 text-xs text-primary/50"
            onClick={() => onReply(comment)}
          >
            Reply
          </Button>
        </div>
      </div>
      {comment.replies.length > 0 &&
        comment.replies.map((reply, index) => (
          <div key={index} className="ml-10 mt-2">
            <div className="flex items-start gap-3 text-sm">
              <Avatar>
                <AvatarFallback>{reply.user[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{reply.user}</p>
                <p className="">{reply.content}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default function Component({ eventId }: { eventId: string }) {
  const [visiblePosts, setVisiblePosts] = useState(3);

  const loadMorePosts = () => {
    setVisiblePosts((prevVisible) =>
      Math.min(prevVisible + 3, postsData.length),
    );
  };

  return (
    <div className="mx-auto max-w-4xl mt-4">
      {postsData.slice(0, visiblePosts).map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {visiblePosts < postsData.length && (
        <div className="mt-6 text-center">
          <Button onClick={loadMorePosts} variant="outline">
            Load More <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
