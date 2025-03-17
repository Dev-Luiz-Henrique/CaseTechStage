export interface OrganizationalUnit {
    id: string;
    name: string;
    parentId: string | null;
    createdAt: string;
    parentName?: string;
}
  