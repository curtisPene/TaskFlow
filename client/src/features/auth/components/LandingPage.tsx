import { Button } from "@/components/ui/button";

import { Link } from "react-router";

import landingPageImage from "../../../assets/icons/images/landing-page-illustration.jpg";

export const LandingPage = () => {
  return (
    <>
      <div className="px-4 py-6 gap-4 flex flex-col items-center">
        <div className="flex flex-col gap-4">
          <p className="font-bold text-2xl leading-8">
            Organize Your Work. Flow Through Your Day.
          </p>
          <p className="font-light text-2xl leading-6">
            TaskFlow helps you plan, track, and complete tasks effortlessly —
            stay focused and get more done.
          </p>
        </div>
        <img
          src={landingPageImage}
          alt="An illustration of a girl with a laptop"
        />
        <div className="flex flex-col gap-1 w-full items-center">
          <Button className="w-full">
            <Link to="/signup">Sign up - it's free!</Link>
          </Button>
          <p>
            Already have an account?{" "}
            <Link className="text-primary" to="/login">
              log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
