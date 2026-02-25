import { useEntitlements } from "@frontegg/react";

export const FeatureFlagTest = () => {
  const { isEntitled } = useEntitlements({ featureKey: "enforcement-test-feature-key" });

  return (
    <div>
      {isEntitled?<h1 className={'feature-flag-off-on'}>Feature flag is ON</h1>:<h1 className={'feature-flag-off'}>Feature flag is OFF</h1>}
    </div>
  );
};