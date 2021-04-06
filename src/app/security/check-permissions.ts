export function checkPermission(sessionUserPermissions: string[], permissions: string[]): boolean {
    let hasPermission = false;
    if (sessionUserPermissions) {
      for (const permission of permissions) {
        const permissionFound = sessionUserPermissions.find(x => x.toUpperCase() === permission.toUpperCase());
        if (permissionFound !== undefined) {
            hasPermission = true;
        }
      }
    }
    return hasPermission;
}