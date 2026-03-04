import {storeClicks} from "@/db/apiClicks";
import {getLongUrl} from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {BarLoader} from "react-spinners";

const RedirectLink = () => {
  const {id} = useParams();

  // Fetch the long/original URL for this short id
  const {
    loading,
    data,
    error,
    fn: fetchLongUrl,
  } = useFetch(getLongUrl, id);

  useEffect(() => {
    fetchLongUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Once we have the long URL, record the click and THEN redirect the browser.
  // We await the stats call so the request isn't cancelled when we navigate away.
  useEffect(() => {
    if (!loading && data?.id && data?.original_url) {
      (async () => {
        try {
          await storeClicks({id: data.id});
        } catch (e) {
          console.error("Failed to store click stats:", e);
        } finally {
          window.location.href = data.original_url;
        }
      })();
    }
  }, [loading, data]);

  if (loading) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  }

  // If there was an error or no data, render nothing (you'll just stay on this page)
  if (error || !data?.original_url) return null;

  return null;
};

export default RedirectLink;
