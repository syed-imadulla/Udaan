import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Demo() {
    const [status, setStatus] = useState("loading...");
    useEffect(() => {
        api.health().then((r) => setStatus(r.status)).catch((e) => setStatus("error: " + e.message));
    }, []);
    return <p className="text-lg">Backend says: {status}</p>;
}
