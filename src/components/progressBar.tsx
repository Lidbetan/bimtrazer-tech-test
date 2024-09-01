import { Progress } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function ProgressBar({ progress }: { progress: number }) {
    return (
        <Progress
            aria-label="Progress completion"
            size="md"
            radius="sm"
            value={progress}
            color={
                progress === 100
                    ? "success"
                    : progress <= 25
                    ? "warning"
                    : "primary"
            }
            showValueLabel={true}
            className="max-w-md"
            classNames={{
                base: "max-w-md",
                track: "drop-shadow-md border border-default",
                label: "tracking-wider text-[12px] text-default-600",
                value: "text-foreground/60 text-[12px]",
            }}
            label="Progress Completion"
        />
    );
}
