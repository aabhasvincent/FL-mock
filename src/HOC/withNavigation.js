import React from "react";
import { useNavigate } from "react-router-dom";

export const withNavigation = (Component ) => {
    const Wrapper = (props) => {
        const navigate = useNavigate();
        
        return (
          <Component
            navigate={navigate}
            {...props}
            />
        );
      };
      
      return Wrapper;
  } 