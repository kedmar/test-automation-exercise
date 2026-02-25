import {
  useAuthActions,
  useAuthUserOrNull,
} from '@frontegg/react';

const SwitchTenant = () => {
  const user = useAuthUserOrNull();
  const { switchTenant } = useAuthActions();

  return (
    <div>
    <h2>Tenants:</h2>
    {(user?.tenants ?? []).map((tenant) => {
      const isCurrentTenant = tenant.tenantId === user?.tenantId

      return (
        <div key={tenant.tenantId}>
          <b>Tenant Id:</b>
         <span data-test-id={isCurrentTenant ? 'current-tenant-id-option' : 'new-tenant-id-option'}>{tenant['tenantId']}</span>
          <div style={{ display: 'inline-block', width: '20px' }} />
          {isCurrentTenant ? (
            <b>Current Tenant</b>
          ) : (
            <button
              data-test-id="switch-tenant-button"
              onClick={() => {
                switchTenant({ tenantId: tenant.tenantId });
              }}
            >
              Switch to tenant
            </button>
          )}
        </div>
      );
    })}
  </div>
  )
}

export default SwitchTenant