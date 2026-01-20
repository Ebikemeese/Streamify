import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
    getUserFriends, getRejectedFriendRequests, acceptFriendRequest, rejectFriendRequest
} from "../../lib/api";
import { Link } from "react-router";
import { UsersIcon, UserXIcon } from "lucide-react";
import FriendCard from "../../components/FriendCard";
import NoFriendsFound from "../../components/NoFriendsFound";

const FriendsPage = () => {

    const queryClient = useQueryClient();

    const { mutate: acceptRequestMutation, isPending: isAccepting } = useMutation({
        mutationFn: acceptFriendRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
            queryClient.invalidateQueries({ queryKey: ["friends"] });
            queryClient.invalidateQueries({ queryKey: ["rejectedFriends"] })
        },
    });

    const { mutate: rejectRequestMutation, isPending: isRejecting } = useMutation({
        mutationFn: rejectFriendRequest,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
                queryClient.invalidateQueries({ queryKey: ["friends"] });
                queryClient.invalidateQueries({ queryKey: ["rejectedFriends"] })
            },
    });

    const { data: friends = [], isLoading: loadingFriends } = useQuery({
        queryKey: ["friends"],
        queryFn: getUserFriends,
    });

    console.log("Friends", friends)

    const { data: rejectedFriendRequests = [], isLoading: loadingRejectedFriendRequest } = useQuery({
        queryKey: ["rejectedFriends"],
        queryFn: getRejectedFriendRequests
    })

    console.log("Rejected friend requests", rejectedFriendRequests)

    return (
        <div className="bg-base-100 p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto space-y-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
                    <Link to="/notifications" className="btn btn-outline btn-sm">
                        <UsersIcon className="mr-2 size-4" />
                        Friend Requests
                    </Link>
                </div>

                {loadingFriends ? (
                <div className="flex justify-center py-12">
                    <span className="loading loading-spinner loading-lg" />
                </div>
                ) : friends.data.length === 0 ? (
                <NoFriendsFound />
                ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {friends.data.map((friend) => (
                    <FriendCard key={friend._id} friend={friend} />
                    ))}
                </div>
                )}

            </div>

            {
                rejectedFriendRequests.length > 0 && (
                    <section className="space-y-4 my-8">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <UserXIcon className="h-5 w-5 text-primary" />
                            Friend Requests You Rejected
                        <span className="badge badge-primary ml-2">{rejectedFriendRequests.data.length}</span>
                    </h2>

                    <div className="space-y-3">
                        {rejectedFriendRequests.data.map((requestRequest) => (
                            <div
                                key={requestRequest._id}
                                className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                            <div className="card-body p-4">
                                <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="avatar w-14 h-14 rounded-full overflow-hidden bg-base-300">
                                    <img src={requestRequest.sender.profilePic.url} alt={requestRequest.sender.fullName} />
                                    </div>
                                    <div>
                                    <h3 className="font-semibold">{requestRequest.sender.fullName}</h3>
                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                        <span className="badge badge-secondary badge-sm">
                                        Native: {requestRequest.sender.nativeLanguage}
                                        </span>
                                        <span className="badge badge-outline badge-sm">
                                        Learning: {requestRequest.sender.learningLanguage}
                                        </span>
                                    </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                

                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => acceptRequestMutation(requestRequest._id)}
                                        disabled={isAccepting}
                                    >
                                    Accept
                                    </button>
                                </div>
                                </div>
                            </div>
                            </div>
                        ))}
                    </div>
                </section>
                )
            }
            




        </div>
    );
};

export default FriendsPage;