import { useState } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../../lib/api";
import { LoaderIcon, CameraIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon } from "lucide-react";
import { LANGUAGES } from "../../constants";
import { useNavigate } from "react-router-dom"

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic?.url || "",
    profileFile: null,
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      navigate("/")
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Profile onboarded successfully");
      
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormState({
        ...formState,
        profileFile: file,
        profilePic: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", formState.fullName);
    formData.append("bio", formState.bio);
    formData.append("nativeLanguage", formState.nativeLanguage);
    formData.append("learningLanguage", formState.learningLanguage);
    formData.append("location", formState.location);

    if (formState.profileFile) {
      formData.append("profilePic", formState.profileFile);
    } else if (formState.profilePic) {
      formData.append("profilePicUrl", formState.profilePic);
    }

    onboardingMutation(formData);
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete Your Profile</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PROFILE PIC */}
            <div className="flex flex-col items-center space-y-4">
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img src={formState.profilePic} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              <input type="file" accept="image/*" onChange={handleFileChange} className="file-input file-input-bordered w-full max-w-xs" />

          
            </div>

            {/* FULL NAME */}
            <div className="form-control">
              <label className="label"><span className="label-text">Full Name</span></label>
              <input type="text" value={formState.fullName} onChange={(e) => setFormState({ ...formState, fullName: e.target.value })} className="input input-bordered w-full" />
            </div>

            {/* BIO */}
            <div className="form-control">
              <label className="label"><span className="label-text">Bio</span></label>
              <textarea value={formState.bio} onChange={(e) => setFormState({ ...formState, bio: e.target.value })} className="textarea textarea-bordered h-24" />
            </div>

            {/* LANGUAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Native Language</span></label>
                <select value={formState.nativeLanguage} onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })} className="select select-bordered w-full">
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => <option key={lang} value={lang.toLowerCase()}>{lang}</option>)}
                </select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Learning Language</span></label>
                <select value={formState.learningLanguage} onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })} className="select select-bordered w-full">
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang) => <option key={lang} value={lang.toLowerCase()}>{lang}</option>)}
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-control">
              <label className="label"><span className="label-text">Location</span></label>
              <input type="text" value={formState.location} onChange={(e) => setFormState({ ...formState, location: e.target.value })} className="input input-bordered w-full" />
            </div>

            <button className="btn btn-primary w-full" disabled={isPending} type="submit">
              {!isPending ? (<><ShipWheelIcon className="size-5 mr-2" /> Complete Onboarding</>) : (<><LoaderIcon className="animate-spin size-5 mr-2" /> Onboarding...</>)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
