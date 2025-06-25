import { describe, expect, it, vi } from "vitest";

import { onGetCampaigns } from "@/actions/campaign.action";
import { _post } from "@/lib/handlers/fetch";
import { GetCampaignsParams } from "@/types/campaign/campaign.params";

// Mock the fetch handler
vi.mock("@/lib/handlers/fetch", () => ({
  _post: vi.fn(),
}));

describe("onGetCampaigns", () => {
  it("should construct correct API endpoint with parameters", async () => {
    const mockPost = vi.mocked(_post);
    mockPost.mockResolvedValue({ success: true, data: { campaigns: [] } });

    const params: GetCampaignsParams["params"] = {
      page: 1,
      pageSize: 10,
      search: "pizza",
      orderBy: "ASC",
    };

    const payload: GetCampaignsParams["payload"] = {
      indvId: null,
      distance: 50,
      location: { lat: 40.7128, lng: -74.006 },
      categories: [],
      fetchById: "none",
      fetchByGoal: "INSTORE",
    };

    await onGetCampaigns({ params, payload });

    expect(mockPost).toHaveBeenCalledWith(
      expect.stringContaining("pgStart=1"),
      payload,
      expect.any(Object)
    );
  });
});
