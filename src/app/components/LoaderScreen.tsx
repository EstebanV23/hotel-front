'use client'

import { useEffect, useState } from "react";
import { useLoaderStore } from "../store/loaderStore";
import { createPortal } from "react-dom";
import { Spinner } from "@nextui-org/react";

export default function LoaderScreen() {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const { loading } = useLoaderStore((store) => store)

  useEffect(() => {
    setElement(document.getElementById("loadingRoot"))
  }, [])

  if (!loading || !element) return null
  console.log("LoaderScreen")
  return createPortal((
    <div className="fixed z-50 top-0 left-0 w-full h-screen grid items-center bg-slate-700 bg-opacity-40">
      <Spinner size="lg" color="primary" />
    </div>
  ), element);
}