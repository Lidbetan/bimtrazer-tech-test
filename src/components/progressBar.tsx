import { Progress } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function ProgressBar({ progress }: { progress: number }) {
    return (
        <Progress
            aria-label="Downloading..."
            size="md"
            value={progress}
            color="primary"
            showValueLabel={true}
            className="max-w-md"
        />
    );
}
